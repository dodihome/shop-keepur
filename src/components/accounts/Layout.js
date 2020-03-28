const Layout = props => (
    <div className='main container auth'>
        <div className='logo'>
            <img src='/images/logo-dodi.png' />
        </div>
        {props.children}
    </div>
  );
  
  export default Layout;