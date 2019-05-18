import React from 'react';
import './EditDashboard.scss';
import NavBar from '../../components/NavBar/NavBar';

interface Props {
  location: any;
}

const Dashboard = (props: Props) => {
  const search = props.location.search; // should be '?resource=/public/path'
  const params = new URLSearchParams(search);
  const uri = params.get('resource'); 
  let url = `${process.env.REACT_APP_JASPERSERVER_URL}/dashboard/designer.html?decorate=no&theme=bike_share`;
  if (uri != undefined) {
    url += '#' + uri;
  }

  return (
    <>
      <NavBar />
      <div className={'dashboard-container'}>
        <div className={'grid dashboard'}>
          <div className={'grid__row'}>
            <div className={'grid__column-12 grid__column-m-4'}>
              <iframe
                className={'dashboard-frame'}
                src={url}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
