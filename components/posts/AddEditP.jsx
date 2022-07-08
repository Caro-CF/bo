import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { Link } from "../Link";
import { alertService } from "../../services";
import { postService } from "services/post.service";

export { AddEditP };

function AddEditP(props) {
  console.log("props");
  console.log(props);
  const post = props?.post;
  const isAddMode = !post;
  const router = useRouter();
  

  // form validation rules
  const validationSchema = Yup.object().shape({
    post: Yup.string().required("Post requis"),
    media: Yup.string().required("Media requis"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // set default form values if post passed in props
  if (!isAddMode) {
    const { ...defaultValues } = post;
    formOptions.defaultValues = defaultValues;
  }

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data) {
    console.log("data " + console.table(data));
    return isAddMode ? createPost(data) : updatePost(data.res_id, data);
  }

  function createPost(data) {
    console.log("create post : " + data);
    return postService
      .register(data)
      .then(() => {
        alertService.success("Post ajouté", {
          keepAfterRouteChange: true,
        });
        router.push(".");
      })
      .catch(alertService.error);
  }

  function updatePost(id, data) {
    return postService
      .update(id, data)
      .then(() => {
        alertService.success("Post mis à jour", {
          keepAfterRouteChange: true,
        });
        router.push("..");
      })
      .catch(alertService.error);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="m-5">
      <h1>{isAddMode ? "Ajouter un Post" : "Modérer un Post"}</h1>

      <div className="form-row">
      <div className="form-group col-4">
          <label>Media</label>
          <img
            src={`http://linksforcitizens.local:3000/public/upload/images/media/${post.media.path}`}
            width={150}
            height={150}
            alt="Avatar de l'utilisateur"
          />
          <div className="invalid-feedback">{errors.media?.message}</div>
        </div>
        <div className="form-group col-5">
          <label>Post</label>
          <textarea
            rows={4}
            name="answers"
            {...register("answers")}
            className={`form-control ${errors.post ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback ">{errors.post?.message}</div>
        </div>
        
      </div>

      <div className="form-group">
        <button
          type="submit"
          disabled={formState.isSubmitting}
          className="btn btn-danger mr-2"
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
        <Link href="/posts" className="btn btn-link">
          Annuler
        </Link>
      </div>
    </form>
  );
}
