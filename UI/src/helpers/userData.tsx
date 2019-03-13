// User Access Levels
export const COO_ROLE = 'COO_ROLE';
export const FRANCHISE_MANAGER_ROLE = 'FRANCHISE_MANAGER_ROLE';
export const DRIVER_ROLE = 'DRIVER_ROLE';

export interface User {
  userName: string;
  title: string;
  role: string;
  token: string;
}

/**
 * SSO is not being used, so restricted, never expiring tokens are used for each user type.
 */
export const userData: User[] = [
  {
    userName: 'Carolyn Coo',
    title: 'COO',
    role: COO_ROLE,
    token:
      'WXQ9SzJkZE4xT19EXDYwcQ==mLdLkeHDirq7yQHSjBjuDrYDvoIfRE2+kRjEUU0ATK1Obry2FlaAJBzcg8Rv3SMxljx6FHq2BFdV2n9Q2ojtZg=='
  },
  {
    userName: 'Jeff Franchise',
    title: 'Franchise Manager',
    role: FRANCHISE_MANAGER_ROLE,
    token:
      'Z0w2WlNnQUdvUjU4XTE0Uw==85e5lVs6C3eeu/YwT1+N7K7T0sMI+0Y1JboAw1IOYZ20IMLZR3JO2KHegdUAVzkMwCQNFIRGEpo4N2NIS6ZamA=='
  },
  {
    userName: 'John Driver',
    title: 'Driver',
    role: DRIVER_ROLE,
    token:
      'XVE5QG1OUj9BWD9RZUNrYA==jIUQ0vVdDSsMTFON1t7DfpbMqJPg2FE/zMXwOpqVyiBhBTK4hJFmMSWbNLFHN82nbScGBDAGCXdb6V6a8zhkmg=='
  }
];
