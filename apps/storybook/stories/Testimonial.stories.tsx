import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import {
  Testimonial,
  TestimonialContent,
  TestimonialAuthor,
  TestimonialAvatar,
  TestimonialName,
  TestimonialRole,
  TestimonialRating,
  TestimonialCarousel,
} from '@r-ui/react-native';

const meta: Meta<typeof Testimonial> = {
  title: 'Components/Marketing/Testimonial',
  component: Testimonial,
  argTypes: {
    variant: {
      control: 'select',
      options: ['card', 'inline', 'large'],
      description: 'Layout variant',
    },
  },
  args: {
    variant: 'card',
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 20, maxWidth: 500 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Testimonial>;

export const Default: Story = {
  render: (args) => (
    <Testimonial {...args}>
      <TestimonialContent>
        This product has completely transformed how our team works. The intuitive
        interface and powerful features have boosted our productivity by 40%.
      </TestimonialContent>
      <TestimonialAuthor
        name="Sarah Johnson"
        role="Product Manager"
        company="TechCorp"
        avatar="https://i.pravatar.cc/150?img=1"
      />
    </Testimonial>
  ),
};

export const Card: Story = {
  render: () => (
    <Testimonial variant="card">
      <TestimonialRating value={5} />
      <TestimonialContent>
        The best investment we've made for our startup. Customer support is
        exceptional and the product just keeps getting better.
      </TestimonialContent>
      <TestimonialAuthor
        name="Michael Chen"
        role="CEO"
        company="StartupXYZ"
        avatar="https://i.pravatar.cc/150?img=3"
      />
    </Testimonial>
  ),
};

export const Inline: Story = {
  render: () => (
    <Testimonial variant="inline">
      <TestimonialAvatar source="https://i.pravatar.cc/150?img=5" size="md" fallback="JD" />
      <TestimonialContent showQuotes={false}>
        Incredibly easy to use and the results speak for themselves.
      </TestimonialContent>
    </Testimonial>
  ),
};

export const Large: Story = {
  render: () => (
    <Testimonial variant="large">
      <TestimonialContent>
        Working with this team has been an absolute pleasure. Their attention to
        detail and commitment to excellence is unmatched in the industry.
      </TestimonialContent>
      <TestimonialAuthor
        name="Emily Rodriguez"
        role="Director of Operations"
        company="Enterprise Inc"
        avatar="https://i.pravatar.cc/150?img=9"
      />
    </Testimonial>
  ),
};

export const WithRating: Story = {
  render: () => (
    <Testimonial variant="card">
      <TestimonialRating value={4} />
      <TestimonialContent>
        Great product with excellent features. Would definitely recommend to others.
      </TestimonialContent>
      <TestimonialAuthor
        name="Alex Thompson"
        role="Software Engineer"
        avatar="https://i.pravatar.cc/150?img=12"
      />
    </Testimonial>
  ),
};

export const WithoutQuotes: Story = {
  render: () => (
    <Testimonial variant="card">
      <TestimonialContent showQuotes={false}>
        A clean testimonial without decorative quote marks for a more minimal look.
      </TestimonialContent>
      <TestimonialAuthor
        name="Lisa Park"
        role="Designer"
        company="Creative Studio"
      />
    </Testimonial>
  ),
};

export const WithFallbackAvatar: Story = {
  render: () => (
    <Testimonial variant="card">
      <TestimonialContent>
        Even when images fail to load, the component gracefully falls back to initials.
      </TestimonialContent>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 8 }}>
        <TestimonialAvatar source="https://invalid-url.com/image.jpg" fallback="JD" />
        <View>
          <TestimonialName>John Doe</TestimonialName>
          <TestimonialRole>Marketing Lead</TestimonialRole>
        </View>
      </View>
    </Testimonial>
  ),
};

export const AvatarSizes: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
      <TestimonialAvatar source="https://i.pravatar.cc/150?img=15" size="sm" />
      <TestimonialAvatar source="https://i.pravatar.cc/150?img=15" size="md" />
      <TestimonialAvatar source="https://i.pravatar.cc/150?img=15" size="lg" />
    </View>
  ),
};

export const RatingVariations: Story = {
  render: () => (
    <View style={{ gap: 8 }}>
      <TestimonialRating value={5} />
      <TestimonialRating value={4} />
      <TestimonialRating value={3} />
      <TestimonialRating value={2} />
      <TestimonialRating value={1} />
    </View>
  ),
};

export const Carousel: Story = {
  decorators: [
    (Story) => (
      <View style={{ padding: 20, width: '100%', maxWidth: 600 }}>
        <Story />
      </View>
    ),
  ],
  render: () => (
    <TestimonialCarousel showDots autoPlay={5000}>
      <Testimonial variant="card">
        <TestimonialRating value={5} />
        <TestimonialContent>
          First testimonial in the carousel. Amazing product that exceeded all expectations.
        </TestimonialContent>
        <TestimonialAuthor
          name="Sarah Johnson"
          role="Product Manager"
          company="TechCorp"
          avatar="https://i.pravatar.cc/150?img=1"
        />
      </Testimonial>
      <Testimonial variant="card">
        <TestimonialRating value={5} />
        <TestimonialContent>
          Second testimonial. The team went above and beyond to ensure our success.
        </TestimonialContent>
        <TestimonialAuthor
          name="Michael Chen"
          role="CEO"
          company="StartupXYZ"
          avatar="https://i.pravatar.cc/150?img=3"
        />
      </Testimonial>
      <Testimonial variant="card">
        <TestimonialRating value={4} />
        <TestimonialContent>
          Third testimonial. Highly recommend for any growing business.
        </TestimonialContent>
        <TestimonialAuthor
          name="Emily Rodriguez"
          role="Director"
          company="Enterprise Inc"
          avatar="https://i.pravatar.cc/150?img=9"
        />
      </Testimonial>
    </TestimonialCarousel>
  ),
};

export const AllVariants: Story = {
  decorators: [
    (Story) => (
      <View style={{ padding: 20, maxWidth: 600 }}>
        <Story />
      </View>
    ),
  ],
  render: () => (
    <View style={{ gap: 24 }}>
      <Testimonial variant="card">
        <TestimonialRating value={5} />
        <TestimonialContent>Card variant with full styling.</TestimonialContent>
        <TestimonialAuthor
          name="Card Example"
          role="Developer"
          avatar="https://i.pravatar.cc/150?img=20"
        />
      </Testimonial>

      <Testimonial variant="inline">
        <TestimonialAvatar source="https://i.pravatar.cc/150?img=21" />
        <TestimonialContent showQuotes={false}>
          Inline variant for compact layouts.
        </TestimonialContent>
      </Testimonial>

      <Testimonial variant="large">
        <TestimonialContent>
          Large variant for hero sections and prominent displays.
        </TestimonialContent>
        <TestimonialAuthor
          name="Large Example"
          role="Designer"
          company="Studio"
          avatar="https://i.pravatar.cc/150?img=22"
        />
      </Testimonial>
    </View>
  ),
};

export const GridLayout: Story = {
  decorators: [
    (Story) => (
      <View style={{ padding: 20, maxWidth: 800 }}>
        <Story />
      </View>
    ),
  ],
  render: () => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
      {[1, 3, 5, 9].map((img) => (
        <View key={img} style={{ width: '48%', minWidth: 250 }}>
          <Testimonial variant="card">
            <TestimonialRating value={5} />
            <TestimonialContent>
              A great product that delivers on its promises.
            </TestimonialContent>
            <TestimonialAuthor
              name={`Customer ${img}`}
              role="User"
              avatar={`https://i.pravatar.cc/150?img=${img}`}
            />
          </Testimonial>
        </View>
      ))}
    </View>
  ),
};
