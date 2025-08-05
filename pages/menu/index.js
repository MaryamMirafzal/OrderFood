import React from 'react'
import MenuPage from '../../components/templates/MenuPage'

function Menu({data}) {
  return (
    <MenuPage data={data}/>
  )
}

export default Menu


export async function getStaticProps() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseUrl}/data`);
  const data = await res.json();

  return {
    props: { data },
    revalidate: parseInt(process.env.REVALIDATE) || 10,
  };
}
