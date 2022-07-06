import { AddEditP } from "components/posts/AddEditP";
import { postService } from "services/post.service";

export default AddEditP;

export async function getServerSideProps({ params }) {
  const post = await postService.getById(params.id);

  return {
    props: { post },
  };
}
