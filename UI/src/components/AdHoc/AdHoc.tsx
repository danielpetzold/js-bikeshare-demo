import React from 'react';
import './AdHoc.scss';
import NavBar from '../NavBar/NavBar';

const AdHoc = () => {
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
