import { BufferGeometry, Material, Mesh, Object3D, Texture } from "three";

type SourceType=BufferGeometry|Material|Texture|Object3D

class ResourceTracker {
  resources:Set<SourceType>
  constructor() {
    this.resources = new Set();
  }
track(resource:SourceType|Material[]|Object3D[]) {
  if(Array.isArray(resource)){
    for(let child of resource){
      this.track(child);
    }
  }else{
    this.resources.add(resource);
    if(resource instanceof Material){
      for (const value of Object.entries(resource)) {
        if (value instanceof Texture) {
          this.track(value);
        }
      }
      if ('uniforms' in resource) {
        for (const uniform of Object.values(resource.uniforms as object)) {
          if(!uniform){continue}
          const uniformValue = uniform.value;
          if (uniformValue instanceof Texture ||Array.isArray(uniformValue)) {
              this.track(uniformValue);
          }
        }
      }
    }
    if(resource instanceof Object3D){
      if (resource instanceof Mesh) {
        this.track(resource.geometry);
        this.track(resource.material);
      }
      this.track(resource.children);
    }
  }
  return resource;
}
  untrack(resource:SourceType) {
    this.resources.delete(resource);
  }
  dispose() {
    for (const resource of this.resources) {
      if(resource instanceof Object3D){
        resource.parent?.remove(resource);
      }else{
        resource.dispose();
      }
    }
    this.resources.clear();
  }
}
export {ResourceTracker}