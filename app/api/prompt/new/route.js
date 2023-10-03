import { connectToDB } from '@/utils/database';
import Prompt from '@/app/models/prompt';

export const GET = async (request) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({}).populate('creator');
    return new Response(JSON.stringify(prompts), {
      status: 200,
    });
  } catch (error) {
    return new Response('Failed to fetch prompts', {
      status: 500,
    });
  }
};
export const POST = async (req) => {
  const { userId, prompt, tag } = await req.json();

  try {
    await connectToDB();
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
    });

    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), {
      status: 201,
    });
  } catch (error) {
    return new Response('Failed to create a new prompt', {
      status: 500,
    });
  }
};
