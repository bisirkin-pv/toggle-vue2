export default function (instance) {
  return {
    conditionEngines() {
      return instance.get("api/v1/condition-engines");
    },
    toggleTypes() {
      return instance.get("api/v1/feature-toggles/types");
    },
  };
}
