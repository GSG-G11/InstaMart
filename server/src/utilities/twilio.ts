import twilio from 'twilio';

export default async (to: string, body: string) => {
  try {
    const { env: { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_NUMBER } } = process;
    const twilioModule = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

    const message = await twilioModule.messages.create({
      from: TWILIO_NUMBER,
      to,
      body,
    });
    return message;
  } catch (err : any) {
    return err;
  }
};
