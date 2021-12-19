import { Button } from '@material-ui/core';

export const Error = ({ reload }) => (
  <div>
    Error!! Error!!!
    <Button onClick={reload}>Reload</Button>
  </div>
);
