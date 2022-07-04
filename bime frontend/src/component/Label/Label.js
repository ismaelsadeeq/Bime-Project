import './Label.css'

const Label = ({loggedUser,isLoading}) => {
    return (
        <div className="label">
            {!isLoading && <h2>{loggedUser.companyName.toUpperCase()}</h2> }
        </div>
    );
}
 
export default Label;