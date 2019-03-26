import React from 'react';
import './AdHoc.scss';
import NavBar from '../../components/NavBar/NavBar';
import { jasperServerUrl } from '../../helpers/constants';

interface Props {
  match: {
    params: {
      path: string;
    };
  };
  location: any;
}

const AdHoc = (props: Props) => {
  const url = `${jasperServerUrl}/flow.html?_flowId=adhocFlow&theme=bike_share&source=/public/Bikeshare_demo/Ad_hoc/App_Report_List/${props.match.params.path}`;
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
