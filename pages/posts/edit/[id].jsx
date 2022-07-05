import { AddEdit } from "../../../components/users/AddEdit";
import { postService } from "services/post.service";

export default AddEdit;

export async function getServerSideProps({ params }) {
  const post = await postService.getById(params.id);

  return {
    props: { post },
  };
}
