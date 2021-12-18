export default function (instance) {
  return {
    getToggles() {
      return instance.get("api/v1/feature-toggles");
    },
    addToggle(payload) {
      return instance.post("api/v1/feature-toggles", payload);
    },
    replaceToggle(payload) {
      return instance.put(`api/v1/feature-toggles/${payload.id}`, payload);
    },
    switchToggle(payload) {
      return instance.patch(`api/v1/feature-toggles/${payload}/state`);
    },
    deleteToggle(payload) {
      return instance.delete(`api/v1/feature-toggles/${payload}`);
    },
  };
}
