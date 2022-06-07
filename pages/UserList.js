function UserList({ users }) {
  return (
    <ul>
      {users.map((users) => (
        <li>{users.firstname}</li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const res = await fetch("http://linksforcitizens.local:3000/api/users");
  const users = await res.json();
  console.log("user list : " + users);

  return {
    props: { users },
  };
}

export default UserList;
