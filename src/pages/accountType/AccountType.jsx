import "./AccountType.scss"
import {Link} from 'react-router-dom'

const AccountType = () => {
  return (
    <div className='AccountType'>
        <div className="wrapper">
            <h3>Select Account Type</h3>
            <Link to="/createStore"><button>Store</button></Link>
            <Link to="/userRegister"><button>User</button></Link>
        </div>
    </div>
  )
}

export default AccountType