import instance from "@/api/instance";

import authModule from "@/api/auth";
import reference from "@/api/reference";
import toggle from "@/api/toggle";

export default {
  auth: authModule(instance),
  ref: reference(instance),
  toggle: toggle(instance),
};
