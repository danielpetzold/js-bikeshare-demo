import React from 'react';
import './AdHoc.scss';
import NavBar from '../../components/NavBar/NavBar';

interface Props {
  match: {
    params: {
      path: string;
    };
  };
  location: any;
}

const AdHoc = (props: Props) => {
  let url = `${process.env.REACT_APP_JASPERSERVER_URL}/flow.html?_flowId=adhocFlow&decorate=no&theme=bike_share`;
  if (props.match.params.path) {
    url += `&resource=/public/Bikeshare_demo/Ad_hoc/App_Report_List/${props.match.params.path}`;
  }

  return (
    <>
      <NavBar />
      <div className={'adhoc-container'}>
        <div className={'grid adhoc-view'}>
          <div className={'grid__row'}>
            <div className={'grid__column-12 grid__column-m-4'}>
              <iframe
                className={'adhoc-frame'}
                src={url}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdHoc;
