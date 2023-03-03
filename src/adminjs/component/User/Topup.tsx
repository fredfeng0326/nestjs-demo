import * as React from 'react';
import { Box, Label, Input, Button, FormGroup } from '@adminjs/design-system';
import { useNavigate } from 'react-router';
import fetch from 'node-fetch';
import { ActionProps } from 'adminjs';

const TopUp = (props: ActionProps) => {
  const { record: initialRecord } = props;
  const navigate = useNavigate();

  const [amount, setAmount] = React.useState(0);

  const onFinish = async () => {
    if (!amount) return;

    await fetch('/admins/top-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: initialRecord?.params?.id,
        amount,
      }),
    }).then(() => navigate('/admin/resources/User/records'));
  };

  return (
    <Box
      variant="white"
      as="form"
      onSubmit={(e) => {
        e.preventDefault();
        onFinish();
      }}
    >
      <Box>
        <FormGroup>
          <Label>Amount</Label>
          <Input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
          />
        </FormGroup>
      </Box>
      <Box style={{ marginTop: 30 }}>
        <Button type="submit">Submit</Button>
      </Box>
    </Box>
  );
};

export default TopUp;
