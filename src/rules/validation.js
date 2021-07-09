import { extend } from "vee-validate"
import { email, required, alpha_num } from "vee-validate/dist/rules"

extend('email', {
    ...email,
    message: "La entrada no es un correo valido"
})
extend('required', {
    ...required,
    message: "La entrada debe tener algun valor"
})
extend('alpha_num', {
   ...alpha_num,
   message: "La entrada no debe contener caracteres especiales" 
})
extend('max_length10', {
    validate: value => {
        return value.length <= 10;
    },
    message: "Número de caracteres excedido"
})