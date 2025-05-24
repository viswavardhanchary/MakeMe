import '../styles/AddLinks.css';
export default function AddLinks({link , setLinks , links}) {
  const handleDelete = () => {
    const newLinks = links.filter((curLink) => {
      return link !== curLink;
    });
    setLinks(newLinks);
    localStorage.setItem('links' , JSON.stringify(newLinks));
  }
  return (
    <>
    <div className="contanier">
      <a href={link} target="_blank">Website : {link}</a>
      <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
    </div>  
    </>

  );
}