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
      defaultHeaders: isOpenRouter ? {
        'HTTP-Referer': process.env.CLIENT_URL,
        'X-Title': 'OneHour Challenge',
      } : undefined,
    });
  } else if (!openai) {
      console.log('--- OPENAI CLIENT FAILED TO INITIALIZE: NO API KEY FOUND ---');
  }
  return openai;
};

const SYSTEM_PROMPT = `You are the AI Assistant for OneHour Challenge — a premium online fitness platform offering 1-hour structured live sessions.

YOUR ROLE:
- You help users understand fitness programs (Fitness, Zumba, Yoga)
- You explain membership plans (PRO: 3 days/week, ADVANCE: 5 days/week)
- You guide users through the booking process
- You answer fitness-related questions professionally

PROGRAMS:
1. Fitness: Weight reduction, muscle toning, core strengthening, improved stamina, progressive programming
2. Zumba: Burn calories, high energy, reduce stress, improve coordination
3. Yoga: Flexibility, mobility, recovery, mental clarity, posture correction

PLANS (Current Production Prices):
- PRO (3 Days/Week): ₹1,499/mo, ₹2,999/3mo, ₹5,999/6mo, ₹7,999/yr
- ADVANCE (5 Days/Week): ₹2,999/mo, ₹5,999/3mo, ₹7,999/6mo, ₹9,999/yr

BOOKING RULES:
- PRO: 3 Sessions/week, max 4 bookings/week
- ADVANCE: 5 Sessions/week, max 6 bookings/week

HOW SESSIONS WORK:
- All sessions are 1 hour long
- Live online sessions with certified trainers
- Sessions run at: 6-9 AM and 5-9 PM
- Limited group size for personalized attention

RULES:
- Be professional, warm, and helpful
- Keep responses concise and structured (use bullet points where helpful)
- NEVER answer questions unrelated to fitness, health, wellness, or OneHour Challenge
- If asked off-topic questions (politics, coding, general knowledge, etc.), respond: "I appreciate your curiosity! However, I specialize in fitness and wellness guidance for OneHour Challenge. For other queries, please visit our contact page or call us at 9515022680."
- Always encourage users to take action (book a session, choose a plan)
- You may discuss general fitness tips, nutrition basics, workout advice — as long as it relates to health and fitness`;

// Built-in smart responses when AI service is unavailable
const FALLBACK_RESPONSES = {
  fat: `Great goal! Fat loss requires a combination of **structured workouts** and **consistent effort**. Here's what we recommend:

• **Fitness** — Builds lean muscle, boosts metabolism, burns fat even at rest
• **Zumba** — High-energy cardio that burns 500-800 calories per session
• **Yoga** — Reduces cortisol (stress hormone) which contributes to fat storage

Our **ADVANCE plan (5 days/week)** is ideal for fat loss goals. Starting at just ₹1,499/month.

Would you like to know more about any specific program, or shall I help you choose a plan?`,

  weight: `For weight management, we recommend a combination approach:

• **Fitness** — Build muscle to increase your resting metabolic rate
• **Zumba** — Fun cardio sessions that burn significant calories
• **Yoga** — Aids recovery and reduces stress-related weight gain

Our structured 1-hour sessions are designed for progressive results. The **ADVANCE plan** (5 days/week) gives you maximum results.

Would you like to explore our plans?`,

  yoga: `Our **Yoga program** is excellent! Here's what it covers:

• **Flexibility** — Improve range of motion gradually
• **Mobility** — Better joint health & movement
• **Recovery** — Perfect complement to strength training
• **Mental clarity** — Mindfulness and stress relief
• **Posture correction** — Ideal for desk workers

Sessions are 1 hour, led by our certified Yoga Alliance RYT-500 instructor.

Available in both **PRO (3 days/week)** and **ADVANCE (5 days/week)** plans. Would you like pricing details?`,

  zumba: `Our **Zumba sessions** are incredibly popular! Here's why:

• **Burn calories** — 500-800 calories per session
• **High energy** — Fun dance movements that don't feel like exercise
• **Reduce stress** — Release endorphins naturally
• **Improve coordination** — Better body awareness

Led by our Zumba Licensed Instructor with 6+ years of experience.

Available in both plans. Starting at ₹999/month for PRO. Would you like to book a session?`,

  strength: `Our **Fitness** program is designed for real results:

• **Weight reduction** — Build lean muscle, burn more fat
• **Muscle toning** — Progressive overload approach
• **Core strengthening** — Foundation for all movements
• **Improved stamina** — Better endurance over time
• **Progressive programming** — No random workouts

Our ACE-certified trainer with 8+ years experience leads every session.

Would you like to know about our PRO or ADVANCE plans?`,

  plan: `Here are our membership plans:

**PRO Plan (3 Days/Week)**
• ₹999/month
• ₹2,499/3 months
• ₹4,499/6 months
• ₹7,999/yearly

**ADVANCE Plan (5 Days/Week)**
• ₹1,499/month
• ₹3,999/3 months ⭐ Most Popular
• ₹6,999/6 months
• ₹11,999/yearly

Both plans include access to all programs (Strength, Zumba, Yoga), certified trainers, and progress tracking.

The **3-month plan** is our most popular choice! Would you like to get started?`,

  price: `Here are our membership plans:

**PRO Plan (3 Days/Week)**
• ₹999/month | ₹2,499/3 months | ₹4,499/6 months | ₹7,999/yearly

**ADVANCE Plan (5 Days/Week)**
• ₹1,499/month | ₹3,999/3 months | ₹6,999/6 months | ₹11,999/yearly

The 3-month ADVANCE plan at ₹3,999 is our most popular! Would you like to proceed with booking?`,

  session: `Here's how our sessions work:

• **Duration** — 1 hour per session
• **Format** — Live online with certified trainers
• **Morning slots** — 6 AM, 7 AM, 8 AM
• **Evening slots** — 5 PM, 6 PM, 7 PM, 8 PM
• **Group size** — Limited for personal attention

You can book sessions based on your plan:
• PRO — 3 sessions/week (max 4 bookings)
• ADVANCE — 5 sessions/week (max 6 bookings)

Ready to book your first session?`,

  book: `To book a session, simply:

1. Click **"Join Now"** on our website
2. Fill in your details
3. Choose **PRO** or **ADVANCE** plan
4. Select your preferred days and time slot
5. Complete the payment

You can also book a **free trial session** by clicking "Book Free Session" on our homepage!

Would you like to proceed?`,

  trainer: `Our certified trainers:

💪 **Coach Vikram** — ACE Certified, 8+ years, Strength & Conditioning specialist
💃 **Coach Ananya** — Zumba Licensed Instructor, 6+ years, Dance Fitness expert
🧘 **Coach Deepak** — Yoga Alliance RYT-500, 10+ years, Yoga & Mindfulness

All trainers are internationally certified and experienced in online coaching. Would you like to join a session?`,

  default: `Thank you for your interest! I can help you with:

• **Programs** — Fitness, Zumba, Yoga
• **Plans & Pricing** — PRO and ADVANCE memberships
• **Sessions** — How our live sessions work
• **Booking** — How to get started
• **Trainers** — Our certified coaches

What would you like to know more about?`
};

const getSmartResponse = (userMessage) => {
  const msg = userMessage.toLowerCase();
  
  // Off-topic detection
  const offTopicKeywords = ['politics', 'movie', 'cricket', 'code', 'programming', 'javascript', 'python', 'weather', 'news', 'recipe', 'cook'];
  if (offTopicKeywords.some(k => msg.includes(k))) {
    return `I appreciate your curiosity! However, I specialize in fitness and wellness guidance for OneHour Challenge. For other queries, our team will contact you shortly or please visit our contact page.

How can I help you with your fitness goals today?`;
  }
  
  // Match keywords
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
  if (msg.includes('hi') || msg.includes('hello') || msg.includes('hey')) return `Hello! Welcome to OneHour Challenge. 👋\n\nI'm here to help you with fitness programs, plans, and booking. What are you looking for today?`;
  
  return FALLBACK_RESPONSES.default;
};

export const chatWithAI = async (req, res) => {
  console.log('--- AI CHAT REQUEST RECEIVED ---');
  try {
    const { messages, leadId } = req.body;
    const lastUserMessage = messages[messages.length - 1]?.content || '';

    // Try AI first
    const ai = getOpenAI();
    if (ai) {
      try {
        const completion = await ai.chat.completions.create({
          model: process.env.OPENAI_API_KEY.startsWith('sk-or-')
            ? 'openai/gpt-3.5-turbo'
            : 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...messages,
          ],
          max_tokens: 500,
          temperature: 0.7,
        });

        const assistantMessage = completion.choices[0].message.content;

        if (leadId) {
          // TODO: Add validation to ensure leadId is a valid ObjectId
          await Lead.findByIdAndUpdate(leadId, {
            $push: {
              messages: [
                { role: 'user', content: lastUserMessage },
                { role: 'assistant', content: assistantMessage },
              ]
            }
          }).catch(() => {});
        }

        return res.json({ success: true, message: assistantMessage });
      } catch (aiError) {
        console.error('AI API error, using fallback:', aiError?.message);
      }
    }

    // No AI available or AI API failed, use fallback
    const fallbackMessage = getSmartResponse(lastUserMessage);
    if (leadId) {
      await Lead.findByIdAndUpdate(leadId, {
        $push: {
          messages: [
            { role: 'user', content: lastUserMessage },
            { role: 'assistant', content: fallbackMessage },
          ]
        }
      }).catch(() => {});
    }
    return res.json({ success: true, message: fallbackMessage });
  } catch (error) {
    console.error('Chat AI Controller Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const submitLead = async (req, res) => {
  console.log('--- LEAD SUBMISSION RECEIVED ---', req.body.email);
  try {
    const { name, email, mobile, program } = req.body;
    
    // Create lead
    const lead = new Lead({ name, email, mobile, program });
    await lead.save();
    
    // Send notification email
    const mailInfo = await sendLeadEmail(lead);
    console.log('Lead email sent:', mailInfo?.messageId || 'Success');
    
    res.status(201).json({ success: true, leadId: lead._id });
  } catch (error) {
    console.error('Lead submission error:', error);
    res.status(500).json({ error: 'Failed to submit lead' });
  }
};
