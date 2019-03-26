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
  const url = `${process.env.REACT_APP_JASPERSERVER_URL}/flow.html?_flowId=viewReportFlow&theme=bike_share&reportUnit=/public/Bikeshare_demo/Reports/AdHoc_Reports/${props.match.params.path}`;
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
