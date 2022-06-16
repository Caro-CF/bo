import { AddEdit } from "../../../components/users/AddEdit";
import { userService } from "../../../services";

export default AddEdit;

export async function getServerSideProps({ params }) {
  const user = await userService.getById(params.id);
  console.log("param id" + params.id);
  console.log("id jsx param : " + params.id);
  

  return {
    props: { user },
  };
}
