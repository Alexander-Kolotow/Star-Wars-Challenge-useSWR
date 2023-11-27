import Card from "../../components/Card";
import Layout from "../../components/Layout";
import useSWR from 'swr';
import { useRouter } from 'next/router';

export default function Character() {
  
  const router = useRouter();
  const { id } = router.query;

  const fetcher = async (url) => {
    const res = await fetch(url);
  
    if (!res.ok) {
      const error = new Error('An error occurred while fetching the data.');
      error.info = await res.json();
      error.status = res.status;
      throw error;
    }
  
    return res.json();
  };

  const { data, error } = useSWR(`https://swapi.dev/api/people/${id}`, fetcher); // wenn ich die Daten hier destrukturiere, dann Fehlermeldung: data is not defined.
  

  if (error) {
    return (
      <Layout>
        <p>Error occurred: {error.message}</p>
      </Layout>
    );
  }

  if (!data) {
    return (
      <Layout>
        <p>Loading...</p>
      </Layout>
    );
  }

    // data muss hier separat destrukturiert werden.
  const { name, height, eye_color: eyeColor, birth_year: birthYear } = data;

  return (
    <Layout>
      <Card
         id={id}
         name={name}
         height={height}
         eyeColor={eyeColor}
         birthYear={birthYear}
      />
    </Layout>
  );
}
