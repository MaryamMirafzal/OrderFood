import { useRouter } from 'next/router';
import React from 'react'
import DetailsPage from '../../components/templates/DetailsPage';

function Details({ data }) {
  const router = useRouter()
  if(router.isFallback){
    return <h2>Loading Page ...</h2>
  }

  return <DetailsPage {...data}/>
}

export default Details

export async function getStaticPaths() {
  const res = await fetch("http://localhost:4000/data");
  const json = await res.json();
  const data = json.slice(0, 10);

  const paths = data.map(food => ({
    params: { foodDetails: food.id.toString() }
  }));

  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps(context) {
  const { params: { foodDetails } } = context;

  try {
    const res = await fetch(`http://localhost:4000/data/${foodDetails}`);
    if (!res.ok) {
      return { notFound: true };  
    }
    
    const data = await res.json();

    return {
      props: { data },
      revalidate: 10,
    }
  } catch (error) {
    console.error(error);
    return { notFound: true }; 
  }
}
