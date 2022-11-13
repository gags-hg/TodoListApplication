import '../styles/style.css';

function Base  ({ children })  {

    return (
        <div className="container-fluid p-0 m-0  " >
           
        {children}
        
        
        </div>
    );
}

export default Base;