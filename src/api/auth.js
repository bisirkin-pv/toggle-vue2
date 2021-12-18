export default function (instance) {
  return {
    signIn(payload) {
      return instance.post("auth/sing_in", payload);
    },
    singOut(payload) {
      return instance.post("auth/sing_out", payload);
    },
    logout() {
      return instance.delete("auth/logout");
    },
  };
}
