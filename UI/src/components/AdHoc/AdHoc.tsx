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
              <iframe className={'adhoc-frame'} src="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdHoc;
