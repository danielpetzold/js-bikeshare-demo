import React from 'react';
import './AdHoc.scss';
import NavBar from '../NavBar/NavBar';
import { jasperServerUrl } from '../../helpers/constants';

interface Props {
  match: {
    params: {
      path: string;
    };
  };
}

const AdHoc = (props: Props) => {
  return (
    <>
      <NavBar />
      <div className={'adhoc-container'}>
        <div className={'grid adhoc-view'}>
          <div className={'grid__row'}>
            <div className={'grid__column-12 grid__column-m-4'}>
              <iframe
                className={'adhoc-frame'}
                src={`${jasperServerUrl}/flow.html?_flowId=adhocFlow&theme=bike_share&resource=/public/Bikeshare_demo/Ad_hoc/Initial_Bikeshare_Ad_Hoc_View`}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdHoc;
