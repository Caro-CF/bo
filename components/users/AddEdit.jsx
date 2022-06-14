import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { Link } from "../../components/Link";
import { userService, alertService } from "../../services";
import { apiUrl } from "../../config";

import Image from "next/image";


export { AddEdit };

function AddEdit(props) {
  const user = props?.user;
  const isAddMode = !user;
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  // form validation rules
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    firstname: Yup.string().required("Prénom requis"),
    lastname: Yup.string().required("Nom requis"),
    mail: Yup.string().email("Email invalide").required("Email est requis"),
    role: Yup.string().required("Role requis"),
    password: Yup.string()
      .transform((x) => (x === "" ? undefined : x))
      .concat(isAddMode ? Yup.string().required("Mot de passe requis") : null)
      .min(6, "Le mot de passe doit au moins 6 caractères"),
    confirmPassword: Yup.string()
      .transform((x) => (x === "" ? undefined : x))
      .when("password", (password, schema) => {
        if (password || isAddMode)
          return schema.required("Confirmer le mot de passe requis");
      })
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // set default form values if user passed in props
  if (!isAddMode) {
    const { password, confirmPassword, ...defaultValues } = user;
    formOptions.defaultValues = defaultValues;
  }

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data) {
    return isAddMode ? createUser(data) : updateUser(user.usr_id, data);
    
  }

  function createUser(data) {
    return userService
      .create(data)
      .then(() => {
        alertService.success("User added", { keepAfterRouteChange: true });
        router.push(".");
      })
      .catch(alertService.error);
  }

  function updateUser(id, data) {
    return userService
      .update(id, data)
      .then(() => {
        alertService.success("User updated", { keepAfterRouteChange: true });
        router.push("..");
      })
      .catch(alertService.error);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>{isAddMode ? "Ajouter un utilisateur" : "Editer un utilisateur"}</h1>
      <div className="form-row">
        <div className="form-group col">
          
            <div className="form-group col-2">
              <Image
                    // src={"http://linksforcitizens.local:3000/public/upload/images/avatar/unknown.png"}
                    src={"/public/upload/images/avatar/" + {...register("avatar_img")}}
                    alt="Avatar de l'utilisateur"
                    width={30}
                    height={30}
                  />
                  </div>
          <div className="form-group col-2">
          <label>Role</label>
          <select
            name="roles"
            {...register("roles")}
            className={`form-control ${errors.roles ? "is-invalid" : ""}`}
          >
            <option value=""></option>
            <option value="Citoyen">Citoyen</option>
            <option value="Adminastrateur">Adminastrateur</option>
          </select>
          <div className="invalid-feedback">{errors.roles?.message}</div>
          </div>
        </div>
        <div className="form-group col-5">
          
          
          
          <div className="invalid-feedback">{errors.mail?.message}</div>
        </div>
        <div className="form-group col-5">
          <label>Prénom</label>
          <input
            name="firstname"
            type="text"
            {...register("firstname")}
            className={`form-control ${errors.firstname ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.firstname?.message}</div>
        </div>
        <div className="form-group col-5">
          <label>Nom</label>
          <input
            name="lastname"
            type="text"
            {...register("lastname")}
            className={`form-control ${errors.lastname ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.lastname?.message}</div>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-3">
          <label>Téléphone</label>
          <input
            name="tel"
            type="text"
            {...register("tel")}
            className={`form-control ${errors.tel ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.tel?.message}</div>
        </div>
        <div className="form-group col-5">
          <label>Email</label>
          <input
            name="mail"
            type="text"
            {...register("mail")}
            className={`form-control ${errors.mail ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.mail?.message}</div>
        </div>
        <div className="form-group col-5">
          <label>Bio</label>
          <input
            name="bio"
            type="text"
            {...register("bio")}
            className={`form-control ${errors.bio ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.mail?.message}</div>
        </div>
        <div className="form-group col-5">
          <label>Date de naissance</label>
          <input
            name="birth_date"
            type="text"
            {...register("birth_date")}
            className={`form-control ${errors.birth_date ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.birth_date?.message}</div>
        </div>
      </div>
      {!isAddMode && (
        <div>
          <h3 className="pt-3">Changer le mode de passe</h3>
          <p>Laisser vide pour avoir le même mot de passe</p>
        </div>
      )}
      <div className="form-row">
        <div className="form-group col">
          <label>
            Mot de passe
            {!isAddMode &&
              (!showPassword ? (
                <span>
                  {" "}
                  -{" "}
                  <a
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-primary"
                  >
                    Montrer
                  </a>
                </span>
              ) : (
                <em> - {user.password}</em>
              ))}
          </label>
          <input
            name="password"
            type="password"
            {...register("password")}
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.password?.message}</div>
        </div>
        <div className="form-group col">
          <label>Confirmer le mot de passe</label>
          <input
            name="confirmPassword"
            type="password"
            {...register("confirmPassword")}
            className={`form-control ${
              errors.confirmPassword ? "is-invalid" : ""
            }`}
          />
          <div className="invalid-feedback">
            {errors.confirmPassword?.message}
          </div>
        </div>
      </div>
      <div className="form-group">
        <button
          type="submit"
          disabled={formState.isSubmitting}
          className="btn btn-primary mr-2"
        >
          {formState.isSubmitting && (
            <span className="spinner-border spinner-border-sm mr-1"></span>
          )}
          Sauvegarder
        </button>
        <button
          onClick={() => reset(formOptions.defaultValues)}
          type="button"
          disabled={formState.isSubmitting}
          className="btn btn-secondary"
        >
          Mise a zéro
        </button>
        <Link href="/users" className="btn btn-link">
          Annuler
        </Link>
      </div>
    </form>
  );
}
