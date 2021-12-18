export default function (instance) {
  return {
    getToggles() {
      return instance.get("api/v1/feature-toggles");
    },
    addToggle(payload) {
      return instance.post("api/v1/feature-toggles", payload);
    },
    updateToggle(payload) {
      return instance.put(`api/v1/feature-toggles/${payload.id}`, payload);
    },
    deleteToggle(payload) {
      return instance.delete(`api/v1/feature-toggles/${payload}`);
    },
  };
}
