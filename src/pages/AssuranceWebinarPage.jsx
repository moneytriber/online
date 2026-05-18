import { useEffect } from 'react'
import {
  ArrowRight,
  BookOpen,
  Check,
  Clock,
  Sparkles,
  Users,
  X,
} from 'lucide-react'
import coachPhoto from '../assets/coach-photo.jpg'
import Button from '../components/ui/Button'
import { Card, CardContent } from '../components/ui/Card'

const problemCards = [
  'You have money saved but don’t know what to do with it',
  'You’re scared of losing money if you invest',
  'You’ve heard about stocks, real estate, etc… but it sounds confusing',
  'You don’t trust most investment opportunities',
  'You keep postponing investing because you’re unsure',
  'You leave it sitting in your account doing nothing',
]

const truthShiftPoints = [
  'Most people make investing look complicated.',
  'They talk in big grammar instead of simple explanation.',
  'Or they promote risky “quick money” ideas.',
]

const curriculumCards = [
  'How to invest and get steady returns (instead of guessing)',
  'Safe investment options you can start with',
  'How real estate works (even if you don’t have millions)',
  'How to grow money in dollars',
  'Basic understanding of stocks (no confusion)',
  'You will finally understand how investing works',
]

const transformation = {
  before: ['Confused', 'Scared to invest', 'Money not growing', 'Always postponing'],
  after: [
    'Clear on what to do',
    'Confident to invest',
    'Understand different options',
    'Ready to start growing your money',
  ],
}

const testimonials = [
  {
    quote:
      '“Before this class, I was scared of anything called investment. Everything felt like scam. But now, I actually understand where my money can go. This changed my mindset completely.”',
    name: 'Chioma',
    role: 'Business Owner',
  },
  {
    quote:
      '“I had money saved but didn’t know what to do with it. After attending, I finally understood fixed income and how to start small. This class is worth it.”',
    name: 'Tunde',
    role: '9–5 Worker',
  },
  {
    quote:
      '“The way she explained everything was so simple. No big grammar. I now feel confident enough to start investing.”',
    name: 'Amaka',
    role: 'Beginner Investor',
  },
  {
    quote:
      '“I wish I attended this earlier. I’ve been delaying for years because of fear. Now I understand better and I’m ready.”',
    name: 'Sadiq',
    role: 'Young Professional',
  },
]

const credentials = [
  'Certified Financial Education Instructor',
  'Financial Advisor and Businesswoman',
  'Founder of TheMoneyFlexTribe',
  'Former Head of Abuja Retail Team at ARM Investment Managers',
  '5+ years of experience helping individuals make better financial decisions',
]

const PAYSTACK_URL = 'https://paystack.shop/pay/moneytriber'
const META_PIXEL_ID = '1655073878944545'

function updateMetaTag(property, content, attribute = 'name') {
  let tag = document.head.querySelector(`meta[${attribute}="${property}"]`)

  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attribute, property)
    document.head.appendChild(tag)
  }

  tag.setAttribute('content', content)
}

function SectionLabel({ children, dark = false }) {
  return (
    <p
      className={`text-xs font-semibold uppercase tracking-[0.28em] ${
        dark ? 'mf-text-on-dark-muted' : 'mf-text-primary'
      }`}
    >
      {children}
    </p>
  )
}

function AssuranceWebinarPage() {
  useEffect(() => {
    document.title = 'Investing With Assurance 2.0 | MoneyFlex Tribe'
    updateMetaTag(
      'description',
      'Learn How to Grow Your Money Without Fear or Confusion. A live online class from MoneyFlex Tribe that teaches simple, safe ways to start investing.'
    )
    updateMetaTag(
      'og:title',
      'Investing With Assurance 2.0 | MoneyFlex Tribe',
      'property',
    )
    updateMetaTag(
      'og:description',
      'A live online class that shows you simple, safe ways to start investing even if you’ve never done it before.',
      'property',
    )

    if (!window.fbq) {
      window.fbq = function metaPixelProxy(...args) {
        if (window.fbq.callMethod) {
          window.fbq.callMethod(...args)
        } else {
          window.fbq.queue.push(args)
        }
      }

      if (!window._fbq) {
        window._fbq = window.fbq
      }

      window.fbq.push = window.fbq
      window.fbq.loaded = true
      window.fbq.version = '2.0'
      window.fbq.queue = []

      const script = document.createElement('script')
      script.id = 'moneyflex-meta-pixel'
      script.async = true
      script.src = 'https://connect.facebook.net/en_US/fbevents.js'
      document.head.appendChild(script)
    }

    if (!window.__moneyFlexMetaPixelInitialized) {
      window.fbq('init', META_PIXEL_ID)
      window.__moneyFlexMetaPixelInitialized = true
    }

    window.fbq('track', 'PageView')
  }, [])

  return (
    <div className="mf-page-bg mf-text">
      <section className="mf-gradient-hero">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 sm:py-18 lg:grid-cols-[1.02fr_0.98fr] lg:items-start lg:px-8 lg:py-20">
          <div>
            <div className="flex flex-wrap gap-3">
              {['Live Online Class', 'Beginner Friendly', 'Limited Slots'].map((item) => (
                <span
                  key={item}
                  className="mf-badge inline-flex items-center rounded-full px-4 py-2 text-sm font-medium"
                >
                  {item}
                </span>
              ))}
            </div>

            <h1 className="mf-font-display mf-text-on-dark mf-balance mt-8 text-4xl font-semibold leading-tight sm:text-[3.4rem] lg:text-[3.75rem] lg:leading-[1.04]">
              Learn How to Grow Your Money{' '}
              <span className="italic">Without Fear or Confusion</span>
            </h1>

            <p className="mf-text-on-dark-muted mt-6 max-w-2xl text-lg leading-8">
              A live online class that shows you simple, safe ways to start investing
              even if you’ve never done it before.
            </p>

            <p className="mf-text-on-dark mt-6 text-xl font-medium leading-8">
              You’re making money
              <br />
              But your money is not making money for you.
            </p>

            <div className="mt-8 flex max-w-[32rem] flex-col gap-4 sm:flex-row">
              <Button as="a" href={PAYSTACK_URL} target="_blank" rel="noreferrer">
                Reserve Your Spot Now
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button as="a" href="#curriculum" variant="secondary">
                See What You’ll Learn
              </Button>
            </div>

            <div className="mt-6 max-w-[32rem]">
              <div className="flex w-full items-center justify-between gap-4 rounded-full bg-white px-5 py-3 text-[#23375a] shadow-[0_18px_40px_-28px_rgba(15,23,42,0.45)] sm:px-6">
                <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[#23375a]/70">
                  Class Fee
                </span>
                <span className="text-2xl font-bold tracking-tight">₦15,000</span>
              </div>
              <p className="mf-text-on-dark-muted mt-4 text-sm font-medium">
                Limited slots available • Beginner friendly • No prior knowledge needed
              </p>
            </div>
          </div>

          <div className="w-full max-w-[460px] self-start justify-self-center">
            <div className="overflow-hidden rounded-[32px] bg-slate-950 shadow-[0_30px_90px_-48px_rgba(15,23,42,0.5)]">
              <a
                href="https://youtube.com/shorts/oXr3HCuE7Vs"
                target="_blank"
                rel="noreferrer"
                className="relative block aspect-[9/16] w-full overflow-hidden"
              >
                <img
                  src={coachPhoto}
                  alt="Preview for the Investing With Assurance 2.0 coach video"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.12),rgba(15,23,42,0.42))]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-24 w-24 items-center justify-center rounded-full bg-white/92 text-[#23375a] shadow-[0_18px_40px_-24px_rgba(15,23,42,0.45)] transition duration-200 hover:scale-105">
                    <svg viewBox="0 0 24 24" className="ml-1 h-10 w-10 fill-current" aria-hidden="true">
                      <path d="M8 6.5v11l9-5.5-9-5.5Z" />
                    </svg>
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/75">
                    Watch The Video
                  </p>
                  <p className="mt-2 text-lg font-semibold leading-7 text-white">
                    Open the full class intro on YouTube.
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mf-gradient-hero -mt-4 pb-8 sm:pb-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="w-full">
            <h2 className="mf-font-display mf-text-on-dark text-3xl font-bold sm:text-4xl">
              What This Class Covers
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {[
                'Fixed income investments',
                'Low-risk options',
                'Real estate with small capital',
                'Dollar equity funds and stock basics',
              ].map((item) => (
                <div
                  key={item}
                  className="inline-flex min-h-[56px] items-center gap-2 rounded-full bg-white/96 px-4 py-3 text-sm text-slate-700 shadow-[0_14px_34px_-24px_rgba(15,23,42,0.24)]"
                >
                  <span className="mf-badge inline-flex rounded-full p-1">
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="leading-5">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mf-section-band">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionLabel>Does This Sound Like You?</SectionLabel>
          <h2 className="mf-font-display mf-balance mt-4 max-w-4xl text-3xl font-semibold sm:text-4xl">
            People are not just looking for investment ideas. They are looking for
            clarity they can trust.
          </h2>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {problemCards.map((item) => (
              <Card key={item}>
                <CardContent className="p-6">
                  <div className="mf-icon-chip inline-flex rounded-2xl p-3">
                    <X className="h-5 w-5" />
                  </div>
                  <p className="mt-5 text-base leading-8">{item}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mf-section-band mf-surface-soft">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-8">
          <div>
            <SectionLabel>The Truth Is</SectionLabel>
            <h2 className="mf-font-display mf-balance mt-4 text-3xl font-semibold sm:text-4xl">
              Investing is not as hard or risky as it sounds.
              <span className="italic"> You’ve just not been shown the right way.</span>
            </h2>
          </div>

          <div className="space-y-4">
            {truthShiftPoints.map((item) => (
              <Card key={item} className="bg-transparent shadow-none">
                <CardContent className="flex items-start gap-4 p-0">
                  <span className="mf-icon-chip inline-flex rounded-2xl p-3">
                    <Sparkles className="h-5 w-5" />
                  </span>
                  <p className="mf-text-muted text-base leading-8">{item}</p>
                </CardContent>
              </Card>
            ))}
            <p className="text-lg font-medium">
              That’s why you feel confused.
            </p>
          </div>
        </div>
      </section>

      <section className="mf-section-band">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionLabel>That’s Why We Created…</SectionLabel>
          <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <h2 className="mf-font-display text-3xl font-semibold sm:text-4xl">
                INVESTING WITH ASSURANCE 2.0
              </h2>
              <p className="mf-text-muted mt-5 text-lg leading-8">
                This is a live online class where you’ll learn:
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  'Where to put your money',
                  'How to avoid unnecessary risk',
                  'How to start investing step-by-step',
                ].map((item) => (
                  <div key={item} className="mf-editorial-card-soft rounded-[24px] p-4">
                    <p className="text-sm font-semibold leading-7">{item}</p>
                  </div>
                ))}
              </div>
              <p className="mf-text-muted mt-6 text-base leading-8">
                No pressure. Just simple explanations you will understand.
              </p>
            </div>

            <Button as="a" href={PAYSTACK_URL} target="_blank" rel="noreferrer" variant="secondary">
              Save My Seat
            </Button>
          </div>
        </div>
      </section>

      <section id="curriculum" className="mf-section-band mf-surface-deep scroll-mt-36">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionLabel dark>Here’s Exactly What You’ll Learn</SectionLabel>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {curriculumCards.map((item, index) => (
              <Card
                key={item}
                className="border-none bg-white text-inherit shadow-[0_24px_60px_-36px_rgba(15,23,42,0.3)]"
              >
                <CardContent className="p-6">
                  <div className="mf-badge inline-flex h-11 w-11 items-center justify-center rounded-2xl text-sm font-semibold">
                    0{index + 1}
                  </div>
                  <p className="mt-5 text-lg leading-8 text-slate-900">{item}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mf-section-band">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionLabel>What Will Change For You</SectionLabel>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <Card className="mf-editorial-card-soft">
              <CardContent className="p-8">
                <h3 className="mf-font-display text-3xl font-semibold">Before</h3>
                <div className="mt-6 space-y-4">
                  {transformation.before.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="mf-icon-chip inline-flex rounded-full p-2">
                        <X className="h-4 w-4" />
                      </span>
                      <p className="text-base leading-8">{item}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#eef2f7] border-none shadow-none">
              <CardContent className="p-8">
                <h3 className="mf-font-display text-3xl font-semibold text-slate-950">After</h3>
                <div className="mt-6 space-y-4">
                  {transformation.after.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="mf-badge inline-flex rounded-full p-2">
                        <Check className="h-4 w-4" />
                      </span>
                      <p className="text-base leading-8 text-slate-700">{item}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="mf-section-band mf-surface-soft">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionLabel>What Others Are Saying</SectionLabel>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {testimonials.map((item) => (
              <Card key={item.quote}>
                <CardContent className="p-6">
                  <div className="mf-star-chip flex gap-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Sparkles key={index} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-5 text-base leading-8">{item.quote}</p>
                  <div className="mt-6">
                    <p className="font-semibold">{item.name}</p>
                    <p className="mf-text-muted mt-1 text-sm">{item.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mf-section-band">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:px-8">
          <div className="mf-shadow-soft overflow-hidden rounded-[32px]">
            <img
              src={coachPhoto}
              alt="Portrait of Oluwabusolami Adewale-Kayode"
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <SectionLabel>Meet Your Coach</SectionLabel>
            <h2 className="mf-font-display mf-balance mt-4 text-3xl font-semibold sm:text-4xl">
              Oluwabusolami Adewale-Kayode
            </h2>
            <p className="mf-text-muted mt-5 text-lg leading-8">
              She is a financial expert who has helped many people understand how
              money works.
            </p>
            <p className="mf-text-muted mt-4 text-base leading-8">
              What makes her different is simple:
              <br />
              She explains things in a way anyone can understand.
              <br />
              She focuses on real life, not theory.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {credentials.map((item) => (
                <Card key={item} className="shadow-none">
                  <CardContent className="flex items-start gap-4 p-5">
                    <span className="mf-icon-chip inline-flex rounded-2xl p-3">
                      <Check className="h-4 w-4" />
                    </span>
                    <p className="text-sm leading-7">{item}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mf-section-band">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Card className="mf-editorial-card-soft border-none">
            <CardContent className="flex flex-col gap-6 p-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <SectionLabel>Bonus</SectionLabel>
                <h2 className="mf-font-display mt-4 text-3xl font-semibold">
                  Free Q&amp;A Session After The Class
                </h2>
                <p className="mf-text-muted mt-4 text-base leading-8">
                  Ask your personal investment questions and get clarity.
                </p>
              </div>
              <div className="mf-editorial-card rounded-[24px] px-5 py-4">
                <div className="flex items-center gap-3">
                  <Clock className="mf-text-primary h-5 w-5" />
                  <p className="text-sm font-semibold">Live Q&amp;A included</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mf-section-band mf-surface-soft">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:px-8">
          <div>
            <SectionLabel>Don’t Keep Waiting</SectionLabel>
            <h2 className="mf-font-display mf-balance mt-4 text-3xl font-semibold sm:text-4xl">
              You don’t need more money first.
              <span className="italic"> You need understanding first.</span>
            </h2>
            <div className="mt-8 grid gap-4">
              {[
                ['Your money stays the same', <Clock className="h-4 w-4" />],
                ['Opportunities pass', <ArrowRight className="h-4 w-4" />],
                ['Confusion continues', <BookOpen className="h-4 w-4" />],
              ].map(([item, icon]) => (
                <Card key={item}>
                  <CardContent className="flex items-start gap-4 p-5">
                    <span className="mf-icon-chip inline-flex rounded-2xl p-3">
                      {icon}
                    </span>
                    <p className="text-base leading-8">{item}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card id="register" className="scroll-mt-36">
            <CardContent className="p-8">
              <SectionLabel>Join The Class Now</SectionLabel>
              <h3 className="mf-font-display mt-4 text-3xl font-semibold">
                Reserve My Spot
              </h3>
              <p className="mf-text-muted mt-3 text-base leading-8">
                Live class • Beginner friendly • Limited slots
              </p>
              <div className="mt-8 space-y-4">
                {[
                  'Secure your seat instantly through Paystack',
                  'Get immediate access to your class registration',
                  'Join from anywhere and learn at your own confidence level',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mf-badge inline-flex rounded-full p-2">
                      <Check className="h-4 w-4" />
                    </span>
                    <p className="text-base leading-8 text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 rounded-[24px] bg-[#23375a]/5 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#23375a]/70">
                  Class Fee
                </p>
                <p className="mt-2 text-3xl font-bold tracking-tight text-[#23375a]">
                  ₦15,000
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Pay once to secure your place in the live class.
                </p>
              </div>
              <Button
                as="a"
                href={PAYSTACK_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-8 w-full"
              >
                Reserve My Spot
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mf-gradient-primary">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <SectionLabel dark>Final CTA</SectionLabel>
              <h2 className="mf-font-display mf-text-on-dark mf-balance mt-4 text-3xl font-semibold sm:text-5xl">
                Join The Class Now
              </h2>
              <p className="mf-text-on-dark-muted mt-5 text-lg leading-8">
                A live online class that shows you simple, safe ways to start
                investing even if you’ve never done it before.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button as="a" href={PAYSTACK_URL} target="_blank" rel="noreferrer">
                Reserve My Spot
                <ArrowRight className="h-4 w-4" />
              </Button>
              <div className="mf-text-on-dark-muted flex items-center gap-3 text-sm font-medium">
                <Users className="h-4 w-4" />
                Live class • Beginner friendly • Limited slots
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AssuranceWebinarPage
