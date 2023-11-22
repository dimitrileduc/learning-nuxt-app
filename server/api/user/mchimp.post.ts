import MailchimpMarketing from "@mailchimp/mailchimp_marketing";

export default async function defineEventHandler(event: any) {
  const config = useRuntimeConfig();
  const mailchimpKey = config.mailchimpSecret;

  const { email, username, tag } = await readBody(event);

  MailchimpMarketing.setConfig({
    apiKey: mailchimpKey,
    server: "us21",
  });

  const listId = "cd76cd6995";

  console.log("tag to ass in mchimp", tag);

  
   try {
    // Verify if user already exists in Mailchimp from email address
    const mailchimpUserId = await verifyExistingUser(email, MailchimpMarketing);

    if (mailchimpUserId) {
      console.log("User already exists in Mailchimp", mailchimpUserId);
      // Update with the new tag 
      await updateTag(mailchimpUserId, tag, listId, MailchimpMarketing);
      return 'updated';
    } else {
      console.log("User doesn't exist in Mailchimp");
      // Create with the new tag
      await addUser(email, tag, listId, MailchimpMarketing);
      return 'subscribed';
    }
  } catch (error) {
    console.error("Error during Mailchimp operation:", error);
    return error; // Return a different value for error cases
  }

  

  
  
}

async function verifyExistingUser(email: string, MailchimpMarketing: any) {
  try {
    console.log("email to verify existing mailchimp", email);
    const response = await MailchimpMarketing.lists.getListMembersInfo("cd76cd6995", {
      count:1000
    });
    console.log('users list in mailchimp', response.members);
    console.log("number of users in list", response.members.length)

    // Check if the user with the given email exists in the response
    const existingUser = response.members.find((user) => user.email_address === email);
    console.log('existing user in mailchimp',existingUser);
    
    // Return user ID if found, otherwise return null
    return existingUser ? existingUser.id : null;
  
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function addUser(email: string, tag: string, listId: string, MailchimpMarketing: any) {
  try {
    const response = await MailchimpMarketing.lists.addListMember(listId, {
      email_address: email,
      status: "subscribed",
      tags: [tag],
    });

    console.log("User added successfully:", response);
    return response;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error; // Re-throw the error to propagate it to the caller
  }
}

async function updateTag(mailchimpUserId: string, tag: string, listId: string, MailchimpMarketing: any) {
  try {
    const response = await MailchimpMarketing.lists.updateListMemberTags(listId, mailchimpUserId, {
      tags: [
        {
          name: tag,
          status: "active",
        },
      ],
    });

    console.log("Tag updated successfully:", response);
    return response;
  } catch (error) {
    console.error("Error updating tag:", error);
    throw error; // Re-throw the error to propagate it to the caller
  }
}
