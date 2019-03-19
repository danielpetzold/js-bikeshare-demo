import React from 'react';
import './AdHoc.scss';
import NavBar from '../NavBar/NavBar';

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
                src="http://jrs-bikes-elasticl-1k5yhf91vrjuo-1806919984.us-east-2.elb.amazonaws.com/jasperserver-pro/flow.html?_flowId=adhocFlow&resource=/public/Bikeshare_demo/Ad_hoc/Initial_Bikeshare_Ad_Hoc_View"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdHoc;
