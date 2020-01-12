import React from 'react';
import { useKeycloak } from '@react-keycloak/web';

export default () => {
  const [keycloak] = useKeycloak();
  return (
    <div>
      <button type="button" onClick={() => keycloak.logout()}>
        Logout
      </button>
    </div>
  );
};