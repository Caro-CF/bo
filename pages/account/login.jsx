import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { Link } from "components";
import { Layout } from "components/account";
import { userService, alertService } from "services";
import { Form, Button, Container, Card } from "react-bootstrap";

export default Login;

function Login() {
  const router = useRouter();

  // form validation rules
  const validationSchema = Yup.object().shape({
    mail: Yup.string().required("L'adresse e-mail est requis"),
    password: Yup.string().required("Le mot de passe est requis"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit({ username, password }) {
    return userService
      .login(username, password)
      .then(() => {
        // get return url from query parameters or default to '/'
        const returnUrl = router.query.returnUrl || "/";
        router.push(returnUrl);
      })
      .catch(alertService.error);
  }

  return (
    <Layout>
      <Card id="card" className="d-flex justify-content-center">
        <Card.Title className="mb-4 ml-4">
          <h4>
            Bienvenue dans l&#39;espace d&#39;administration de ressources
            citoyenne
          </h4>
        </Card.Title>
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              <label>Adresse e-mail</label>
              <input
                name="mail"
                type="text"
                {...register("mail")}
                className={`form-control ${
                  errors.mail ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">{errors.mail?.message}</div>
            </Form.Group>
            <Form.Group>
              <label>Mot de passe</label>
              <input
                name="password"
                type="password"
                {...register("password")}
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">{errors.password?.message}</div>
            </Form.Group>
            <button
              disabled={formState.isSubmitting}
              className="btn btn-primary"
            >
              {formState.isSubmitting && (
                <span className="spinner-border spinner-border-sm mr-1"></span>
              )}
              Login
            </button>
          </Form>
        </Card.Body>
      </Card>
    </Layout>
  );
}
