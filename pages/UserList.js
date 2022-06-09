function UserList({ data }) {
  return (
    <>
      <div>
        <form
          action="http://linksforcitizens.local:3000/api/users/"
          method="post"
        >
          <label htlmfor={data.firstname}>First name:</label>
          <input type="text" id="first" name="first" />
          <label htlmfor={data.mail}>mail:</label>
          <input type="text" id="mail" name="mail" />
          <button type="submit">Submit</button>
        </form>
      </div>
      
      <ul>
        {data.map((data) => (
          <li key={data.id}>{data.firstname} &nbsp;{data.mail}</li>
        ))}
      </ul>
      
    </>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://linksforcitizens.local:3000/api/users/`);
  const data = await res.json();
//   const option = {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ data }),
//   };

//   const response = await fetch(res, option);
//   const responseJson = await response.json();
//   console.log(responseJson);

  // Pass data to the page via props
  return { props: { data } };
}

export default UserList;
