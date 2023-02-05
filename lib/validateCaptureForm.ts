import Joi = require("joi");

import { optionsType } from "./takeScreenshot";

const form_schema = Joi.object().keys({
  url: Joi.string().required(),
  type: Joi.string().valid("png", "jpeg").optional(),
  width: Joi.number().min(320).max(3840).optional(),
  height: Joi.number().min(240).max(2160).optional(),
  delay: Joi.number().min(0).max(10).optional(),
  timeout: Joi.number().min(10).max(60).optional(),
  fullPage: Joi.boolean().optional(),
  disableAnimations: Joi.boolean().optional(),
});

function getOptions(form: any) {
  const options = {
    type: "png",
    width: 1280,
    height: 800,
    delay: 0,
    timeout: 30,
    fullPage: false,
    disableAnimations: false,
  } as optionsType;

  if (form.type) options.type = form.type;
  if (form.width) options.width = JSON.parse(form.width);
  if (form.height) options.height = JSON.parse(form.height);
  if (form.delay) options.delay = JSON.parse(form.delay);
  if (form.timeout) options.timeout = JSON.parse(form.timeout);
  if (form.fullPage) options.fullPage = JSON.parse(form.fullPage);
  if (form.disableAnimations) options.disableAnimations = JSON.parse(form.disableAnimations);

  return options;
}

export default function validateCaptureForm(form: any) {
  const { error } = form_schema.validate(form);
  if (error) {
    error.details.forEach((item) => console.error(item.message));
    return;
  }

  return getOptions(form);
}
