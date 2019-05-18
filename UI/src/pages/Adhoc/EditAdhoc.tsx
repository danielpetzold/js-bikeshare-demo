import React from 'react';
import './EditAdhoc.scss';
import NavBar from '../../components/NavBar/NavBar';

interface Props {
  match: {
    params: {
      resource: string;
    };
  };
  location: any;
}

const EditAdhoc = (props: Props) => {
  const search = props.location.search; // should be '?resource=/public/path'
  const params = new URLSearchParams(search);
  const uri = params.get('resource'); 
  let url = `${process.env.REACT_APP_JASPERSERVER_URL}/flow.html?_flowId=adhocFlow&decorate=no&theme=bike_share`;
  if (uri != undefined) {
    url += '&resource=' + uri;
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

export default EditAdhoc;
