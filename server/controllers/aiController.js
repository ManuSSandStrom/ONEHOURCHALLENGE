import OpenAI from 'openai';
import Lead from '../models/Lead.js';
import { sendLeadEmail } from '../utils/mailer.js';

let openai = null;

const getOpenAI = () => {
  if (!openai && process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'YOUR_OPENAI_API_KEY') {
    const isOpenRouter = process.env.OPENAI_API_KEY.startsWith('sk-or-');
    console.log('--- INITIALIZING OPENAI CLIENT ---', isOpenRouter ? 'OpenRouter recognized' : 'Standard OpenAI recognized');
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: isOpenRouter ? 'https://openrouter.ai/api/v1' : undefined,
      defaultHeaders: isOpenRouter
        ? {
            'HTTP-Referer': process.env.CLIENT_URL,
            'X-Title': 'OneHour Challenge',
          }
        : undefined,
    });
  } else if (!openai) {
    console.log('--- OPENAI CLIENT FAILED TO INITIALIZE: NO API KEY FOUND ---');
  }

  return openai;
};

const SYSTEM_PROMPT = `You are the AI Assistant for OneHour Challenge, a premium online fitness platform offering 1-hour structured live sessions.

YOUR ROLE:
- You help users understand fitness programs (Fitness, Zumba, Yoga)
- You explain membership plans (PRO: 3 days/week, ADVANCE: 5 days/week)
- You guide users through the registration process
- You answer fitness-related questions professionally

PROGRAMS:
1. Fitness: Weight reduction, muscle toning, core strengthening, improved stamina, progressive programming
2. Zumba: Burn calories, high energy, reduce stress, improve coordination
3. Yoga: Flexibility, mobility, recovery, mental clarity, posture correction

REGISTRATION FLOW:
- The website does not collect payments
- Members register interest and the team contacts them directly
- Free trial sessions can still be requested through WhatsApp

SESSION FORMAT:
- All sessions are 1 hour long
- Live online sessions with certified trainers
- Sessions run at: 6-9 AM and 5-9 PM
- Limited group size for personalized attention

RULES:
- Be professional, warm, and helpful
- Keep responses concise and structured (use bullet points where helpful)
- NEVER answer questions unrelated to fitness, health, wellness, or OneHour Challenge
- If asked off-topic questions (politics, coding, general knowledge, etc.), respond: "I appreciate your curiosity! However, I specialize in fitness and wellness guidance for OneHour Challenge. For other queries, please visit our contact page or call us at 9515022680."
- Always encourage users to take action (register interest, choose a plan, or request a free trial)
- You may discuss general fitness tips, nutrition basics, and workout advice as long as it relates to health and fitness`;

const FALLBACK_RESPONSES = {
  fat: `Great goal! Fat loss works best with consistent training and a sustainable routine.

- **Fitness** builds lean muscle and supports calorie burn
- **Zumba** adds high-energy cardio and keeps workouts engaging
- **Yoga** supports recovery, flexibility, and stress control

Our **ADVANCE plan** is a strong fit when you want more accountability through the week.

Would you like help choosing the right program for fat loss?`,

  weight: `For weight management, we usually recommend a combination approach:

- **Fitness** for strength and metabolic support
- **Zumba** for cardio and energy
- **Yoga** for recovery and consistency

Our structured 1-hour sessions are designed for steady progress. The **ADVANCE plan** gives you more weekly momentum.

Would you like help comparing PRO and ADVANCE?`,

  yoga: `Our **Yoga program** is a great choice for:

- **Flexibility** and better range of motion
- **Mobility** and joint-friendly movement
- **Recovery** between harder sessions
- **Mental clarity** and stress relief
- **Posture correction** for desk-based lifestyles

Sessions are 1 hour and led by a certified instructor.

Would you like help choosing the best plan for yoga?`,

  zumba: `Our **Zumba sessions** are popular because they combine:

- **Calorie-burning cardio**
- **High-energy guided movement**
- **Stress relief**
- **Better coordination**

They are available within both plan options.

Would you like to register your interest or request a free trial session?`,

  strength: `Our **Fitness** program is designed for real, measurable progress:

- **Weight reduction**
- **Muscle toning**
- **Core strengthening**
- **Improved stamina**
- **Progressive programming**

Every session is guided by an experienced coach.

Would you like to know whether PRO or ADVANCE fits your goal better?`,

  plan: `Here are our membership plans:

**PRO Plan (3 Days/Week)**
- Steady weekly structure
- Best for balanced schedules
- Coach follow-up after registration

**ADVANCE Plan (5 Days/Week)**
- More frequent sessions
- Higher accountability
- Best for faster momentum

Both plans include access to guided coaching and program support.

Would you like help choosing the best plan for your goal?`,

  price: `The website now uses a clean registration-first flow instead of online payment.

You can choose between:
- **PRO** - 3 days per week
- **ADVANCE** - 5 days per week

Register your interest and the team will contact you directly.

Would you like help deciding between PRO and ADVANCE?`,

  session: `Here is how our sessions work:

- **Duration** - 1 hour per session
- **Format** - Live online with certified trainers
- **Morning slots** - 6 AM, 7 AM, 8 AM
- **Evening slots** - 5 PM, 6 PM, 7 PM, 8 PM
- **Group size** - Limited for personal attention

Ready to register or request a free trial session?`,

  book: `To get started:

1. Click **Register** on the website
2. Fill in your details
3. Choose **PRO** or **ADVANCE**
4. Share your preferred interest or goal
5. Submit your registration request

You can also request a **free trial session** through WhatsApp.

Would you like to proceed?`,

  trainer: `Our certified trainers include specialists in:

- **Strength and conditioning**
- **Dance fitness**
- **Yoga and mindfulness**

The coaching approach is designed to be professional, supportive, and results-focused.

Would you like to join a session or register your interest?`,

  default: `I can help you with:

- **Programs** - Fitness, Zumba, Yoga
- **Plans** - PRO and ADVANCE memberships
- **Sessions** - How live sessions work
- **Registration** - How to get started
- **Trainers** - Our coaching team

What would you like to know more about?`,
};

const getSmartResponse = (userMessage) => {
  const msg = userMessage.toLowerCase();

  const offTopicKeywords = ['politics', 'movie', 'cricket', 'code', 'programming', 'javascript', 'python', 'weather', 'news', 'recipe', 'cook'];
  if (offTopicKeywords.some((keyword) => msg.includes(keyword))) {
    return `I appreciate your curiosity! However, I specialize in fitness and wellness guidance for OneHour Challenge. For other queries, our team will contact you shortly or please visit our contact page.

How can I help you with your fitness goals today?`;
  }

  if (msg.includes('fat') || msg.includes('fat loss') || msg.includes('belly')) return FALLBACK_RESPONSES.fat;
  if (msg.includes('weight') || msg.includes('slim') || msg.includes('lean')) return FALLBACK_RESPONSES.weight;
  if (msg.includes('yoga') || msg.includes('meditation') || msg.includes('flexibility')) return FALLBACK_RESPONSES.yoga;
  if (msg.includes('zumba') || msg.includes('dance') || msg.includes('cardio')) return FALLBACK_RESPONSES.zumba;
  if (msg.includes('strength') || msg.includes('muscle') || msg.includes('gym') || msg.includes('weight training')) return FALLBACK_RESPONSES.strength;
  if (msg.includes('plan') || msg.includes('membership')) return FALLBACK_RESPONSES.plan;
  if (msg.includes('price') || msg.includes('cost') || msg.includes('fee') || msg.includes('how much') || msg.includes('charge')) return FALLBACK_RESPONSES.price;
  if (msg.includes('session') || msg.includes('class') || msg.includes('time') || msg.includes('schedule') || msg.includes('slot')) return FALLBACK_RESPONSES.session;
  if (msg.includes('book') || msg.includes('join') || msg.includes('start') || msg.includes('register') || msg.includes('sign up')) return FALLBACK_RESPONSES.book;
  if (msg.includes('trainer') || msg.includes('coach') || msg.includes('instructor')) return FALLBACK_RESPONSES.trainer;
  if (msg.includes('program') || msg.includes('workout') || msg.includes('exercise') || msg.includes('fitness')) return FALLBACK_RESPONSES.default;
  if (msg.includes('hi') || msg.includes('hello') || msg.includes('hey')) {
    return `Hello! Welcome to OneHour Challenge.

I am here to help with fitness programs, plans, and registration. What are you looking for today?`;
  }

  return FALLBACK_RESPONSES.default;
};

export const chatWithAI = async (req, res) => {
  console.log('--- AI CHAT REQUEST RECEIVED ---');

  try {
    const { messages, leadId } = req.body;
    const lastUserMessage = messages[messages.length - 1]?.content || '';

    const ai = getOpenAI();
    if (ai) {
      try {
        const completion = await ai.chat.completions.create({
          model: process.env.OPENAI_API_KEY.startsWith('sk-or-') ? 'openai/gpt-3.5-turbo' : 'gpt-3.5-turbo',
          messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
          max_tokens: 500,
          temperature: 0.7,
        });

        const assistantMessage = completion.choices[0].message.content;

        if (leadId) {
          await Lead.findByIdAndUpdate(leadId, {
            $push: {
              messages: [
                { role: 'user', content: lastUserMessage },
                { role: 'assistant', content: assistantMessage },
              ],
            },
          }).catch(() => {});
        }

        return res.json({ success: true, message: assistantMessage });
      } catch (aiError) {
        console.error('AI API error, using fallback:', aiError?.message);
      }
    }

    const fallbackMessage = getSmartResponse(lastUserMessage);
    if (leadId) {
      await Lead.findByIdAndUpdate(leadId, {
        $push: {
          messages: [
            { role: 'user', content: lastUserMessage },
            { role: 'assistant', content: fallbackMessage },
          ],
        },
      }).catch(() => {});
    }

    return res.json({ success: true, message: fallbackMessage });
  } catch (error) {
    console.error('Chat AI Controller Error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const submitLead = async (req, res) => {
  console.log('--- LEAD SUBMISSION RECEIVED ---', req.body.email);

  try {
    const { name, email, mobile, program } = req.body;

    const lead = new Lead({ name, email, mobile, program });
    await lead.save();

    const mailInfo = await sendLeadEmail(lead);
    console.log('Lead email sent:', mailInfo?.messageId || 'Success');

    return res.status(201).json({ success: true, leadId: lead._id });
  } catch (error) {
    console.error('Lead submission error:', error);
    return res.status(500).json({ error: 'Failed to submit lead' });
  }
};
