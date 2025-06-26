
const page = async() => {

    const testFetch = async() =>{
    try {
      const response = await fetch(
        `/api/texts?page=home`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-cache"
        }
      );
      const data = await response.json();
      return data[0];
    } catch (error) {
      console.error("Error fetching texts:", error);
    }
  };

const x = await testFetch()

  return (
    <div>
      <h1>Career Page Test</h1>
      <p>This is a test page for the career section.</p>
        {`${x}`}
    </div>
  );
};

export default page;
