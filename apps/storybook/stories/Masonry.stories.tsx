import type { Meta, StoryObj } from '@storybook/react';
import { View, StyleSheet, Image } from 'react-native';
import {
  Masonry,
  MasonryItem,
  Card,
  CardContent,
  Text,
  Badge,
} from '@r-ui/react-native';

const meta: Meta<typeof Masonry> = {
  title: 'Components/Layout/Masonry',
  component: Masonry,
  argTypes: {
    columns: {
      control: 'select',
      options: [2, 3, 4],
      description: 'Number of columns',
    },
    gap: {
      control: { type: 'range', min: 8, max: 32, step: 4 },
      description: 'Gap between items',
    },
  },
  args: {
    columns: 3,
    gap: 16,
  },
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <View style={styles.container}>
        <Story />
      </View>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Masonry>;

// Sample content with varying heights
const sampleCards = [
  {
    title: 'Design Systems',
    description: 'Learn how to build scalable design systems that grow with your team.',
    height: 180,
    color: '#3b82f6',
  },
  {
    title: 'React Native Performance',
    description: 'Tips and tricks for optimizing your React Native apps for 60fps animations.',
    height: 220,
    color: '#10b981',
  },
  {
    title: 'TypeScript Tips',
    description: 'Advanced TypeScript patterns for better type safety.',
    height: 150,
    color: '#8b5cf6',
  },
  {
    title: 'Component Architecture',
    description: 'Best practices for structuring your component library for reusability and maintainability across large codebases.',
    height: 240,
    color: '#f59e0b',
  },
  {
    title: 'Testing Strategies',
    description: 'A comprehensive guide to testing React Native applications.',
    height: 160,
    color: '#ec4899',
  },
  {
    title: 'State Management',
    description: 'Comparing different state management solutions for React Native.',
    height: 200,
    color: '#06b6d4',
  },
  {
    title: 'Accessibility',
    description: 'Making your apps accessible to everyone.',
    height: 140,
    color: '#84cc16',
  },
  {
    title: 'Animation Techniques',
    description: 'Creating smooth, performant animations with Reanimated 3 and gesture handlers.',
    height: 210,
    color: '#f43f5e',
  },
  {
    title: 'Navigation Patterns',
    description: 'Deep dive into React Navigation.',
    height: 170,
    color: '#6366f1',
  },
];

export const Default: Story = {
  render: (args) => (
    <Masonry {...args}>
      {sampleCards.map((card, index) => (
        <MasonryItem key={index}>
          <Card variant="elevated" padding="md">
            <CardContent>
              <View style={[styles.cardHeader, { backgroundColor: card.color }]}>
                <Text style={styles.cardNumber}>#{index + 1}</Text>
              </View>
              <Text style={styles.cardTitleHeading}>{card.title}</Text>
              <Text style={styles.cardDescription}>{card.description}</Text>
            </CardContent>
          </Card>
        </MasonryItem>
      ))}
    </Masonry>
  ),
};

export const TwoColumns: Story = {
  render: () => (
    <Masonry columns={2} gap={16}>
      {sampleCards.map((card, index) => (
        <MasonryItem key={index}>
          <Card variant="elevated" padding="md">
            <CardContent>
              <View style={[styles.cardHeader, { backgroundColor: card.color }]}>
                <Text style={styles.cardNumber}>#{index + 1}</Text>
              </View>
              <Text style={styles.cardTitleHeading}>{card.title}</Text>
              <Text style={styles.cardDescription}>{card.description}</Text>
            </CardContent>
          </Card>
        </MasonryItem>
      ))}
    </Masonry>
  ),
};

export const FourColumns: Story = {
  render: () => (
    <Masonry columns={4} gap={12}>
      {sampleCards.map((card, index) => (
        <MasonryItem key={index}>
          <Card variant="elevated" padding="sm">
            <CardContent>
              <View style={[styles.smallCardHeader, { backgroundColor: card.color }]} />
              <Text style={styles.smallCardTitle}>{card.title}</Text>
            </CardContent>
          </Card>
        </MasonryItem>
      ))}
    </Masonry>
  ),
};

export const ResponsiveColumns: Story = {
  render: () => (
    <Masonry columns={{ sm: 1, md: 2, lg: 4 }} gap={16}>
      {sampleCards.map((card, index) => (
        <MasonryItem key={index}>
          <Card variant="elevated" padding="md">
            <CardContent>
              <View style={[styles.cardHeader, { backgroundColor: card.color }]}>
                <Text style={styles.cardNumber}>#{index + 1}</Text>
              </View>
              <Text style={styles.cardTitleHeading}>{card.title}</Text>
              <Text style={styles.cardDescription}>{card.description}</Text>
            </CardContent>
          </Card>
        </MasonryItem>
      ))}
    </Masonry>
  ),
};

export const ImageGallery: Story = {
  render: () => {
    const images = [
      { uri: 'https://picsum.photos/300/400?random=1', height: 200 },
      { uri: 'https://picsum.photos/300/200?random=2', height: 100 },
      { uri: 'https://picsum.photos/300/350?random=3', height: 175 },
      { uri: 'https://picsum.photos/300/250?random=4', height: 125 },
      { uri: 'https://picsum.photos/300/300?random=5', height: 150 },
      { uri: 'https://picsum.photos/300/450?random=6', height: 225 },
      { uri: 'https://picsum.photos/300/180?random=7', height: 90 },
      { uri: 'https://picsum.photos/300/380?random=8', height: 190 },
      { uri: 'https://picsum.photos/300/280?random=9', height: 140 },
    ];

    return (
      <Masonry columns={3} gap={8}>
        {images.map((image, index) => (
          <MasonryItem key={index}>
            <View style={[styles.imageCard, { height: image.height }]}>
              <View style={[styles.imagePlaceholder, { backgroundColor: `hsl(${index * 40}, 70%, 50%)` }]}>
                <Text style={styles.imageNumber}>{index + 1}</Text>
              </View>
            </View>
          </MasonryItem>
        ))}
      </Masonry>
    );
  },
};

export const BlogPosts: Story = {
  render: () => {
    const posts = [
      {
        title: 'Getting Started with r/ui',
        excerpt: 'A comprehensive guide to setting up r/ui in your React Native project.',
        author: 'Sarah Chen',
        date: 'Jan 15, 2024',
        readTime: '5 min read',
        tag: 'Tutorial',
      },
      {
        title: 'Advanced Animation Patterns',
        excerpt: 'Learn how to create complex, performant animations using Reanimated 3 and gesture handlers for a delightful user experience.',
        author: 'Alex Kim',
        date: 'Jan 12, 2024',
        readTime: '12 min read',
        tag: 'Advanced',
      },
      {
        title: 'Design Tokens Deep Dive',
        excerpt: 'Understanding and customizing design tokens in r/ui.',
        author: 'Maria Garcia',
        date: 'Jan 10, 2024',
        readTime: '8 min read',
        tag: 'Design',
      },
      {
        title: 'Building Accessible Forms',
        excerpt: 'Best practices for creating forms that work for everyone, including users with disabilities.',
        author: 'James Wilson',
        date: 'Jan 8, 2024',
        readTime: '10 min read',
        tag: 'Accessibility',
      },
      {
        title: 'Performance Optimization',
        excerpt: 'Tips for keeping your app fast.',
        author: 'Lisa Park',
        date: 'Jan 5, 2024',
        readTime: '6 min read',
        tag: 'Performance',
      },
      {
        title: 'State Management Patterns',
        excerpt: 'Comparing different approaches to state management in React Native applications and when to use each one.',
        author: 'David Lee',
        date: 'Jan 3, 2024',
        readTime: '15 min read',
        tag: 'Architecture',
      },
    ];

    return (
      <Masonry columns={3} gap={20}>
        {posts.map((post, index) => (
          <MasonryItem key={index}>
            <Card variant="outlined" padding="md">
              <CardContent>
                <Badge variant="secondary" size="sm">{post.tag}</Badge>
                <Text style={styles.postTitleHeading}>{post.title}</Text>
                <Text style={styles.postExcerpt}>{post.excerpt}</Text>
                <View style={styles.postMeta}>
                  <Text style={styles.postAuthor}>{post.author}</Text>
                  <Text style={styles.postDot}>·</Text>
                  <Text style={styles.postDate}>{post.date}</Text>
                  <Text style={styles.postDot}>·</Text>
                  <Text style={styles.postReadTime}>{post.readTime}</Text>
                </View>
              </CardContent>
            </Card>
          </MasonryItem>
        ))}
      </Masonry>
    );
  },
};

export const ProductCards: Story = {
  render: () => {
    const products = [
      { name: 'Wireless Earbuds', price: '$79', rating: 4.5, reviews: 234 },
      { name: 'Smart Watch Pro', price: '$299', rating: 4.8, reviews: 567, featured: true },
      { name: 'Portable Charger', price: '$49', rating: 4.2, reviews: 189 },
      { name: 'Bluetooth Speaker', price: '$129', rating: 4.6, reviews: 342 },
      { name: 'USB-C Hub', price: '$59', rating: 4.4, reviews: 156 },
      { name: 'Mechanical Keyboard', price: '$149', rating: 4.7, reviews: 423, featured: true },
      { name: 'Webcam HD', price: '$89', rating: 4.3, reviews: 98 },
      { name: 'Mouse Pad XL', price: '$29', rating: 4.1, reviews: 67 },
    ];

    return (
      <Masonry columns={3} gap={16}>
        {products.map((product, index) => (
          <MasonryItem key={index}>
            <Card variant="elevated" padding="none">
              <View style={[styles.productImage, { backgroundColor: `hsl(${index * 45}, 60%, 90%)` }]}>
                {product.featured && (
                  <Badge variant="default" style={styles.featuredBadge}>Featured</Badge>
                )}
              </View>
              <CardContent style={styles.productContent}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>{product.price}</Text>
                <View style={styles.productRating}>
                  <Text style={styles.ratingStars}>{'★'.repeat(Math.floor(product.rating))}</Text>
                  <Text style={styles.ratingText}>{product.rating} ({product.reviews})</Text>
                </View>
              </CardContent>
            </Card>
          </MasonryItem>
        ))}
      </Masonry>
    );
  },
};

export const SingleItem: Story = {
  render: () => (
    <Masonry columns={3} gap={16}>
      <MasonryItem>
        <Card variant="elevated" padding="lg">
          <CardContent>
            <Text style={styles.headingStyle}>Single Item</Text>
            <Text style={styles.cardDescription}>
              Masonry works with any number of items, including just one.
            </Text>
          </CardContent>
        </Card>
      </MasonryItem>
    </Masonry>
  ),
};

export const ManyItems: Story = {
  render: () => (
    <Masonry columns={4} gap={12}>
      {Array.from({ length: 20 }, (_, i) => (
        <MasonryItem key={i}>
          <Card variant="outlined" padding="sm">
            <CardContent>
              <Text style={styles.itemNumber}>Item {i + 1}</Text>
              <Text style={styles.smallDescription}>
                {i % 3 === 0 ? 'Short content' : i % 3 === 1 ? 'Medium length content for this card' : 'Longer content that takes up more vertical space in the layout'}
              </Text>
            </CardContent>
          </Card>
        </MasonryItem>
      ))}
    </Masonry>
  ),
};

export const MixedContent: Story = {
  render: () => (
    <Masonry columns={3} gap={16}>
      <MasonryItem>
        <Card variant="elevated" padding="md">
          <CardContent>
            <Badge variant="success">New</Badge>
            <Text style={styles.mixedTitleHeading}>Text Card</Text>
            <Text style={styles.cardDescription}>A simple text-based card with a badge.</Text>
          </CardContent>
        </Card>
      </MasonryItem>
      <MasonryItem>
        <View style={[styles.colorBlock, { backgroundColor: '#3b82f6' }]}>
          <Text style={styles.colorBlockText}>Full Color</Text>
        </View>
      </MasonryItem>
      <MasonryItem>
        <Card variant="outlined" padding="lg">
          <CardContent>
            <Text style={styles.quoteText}>
              "The best component library I've ever used."
            </Text>
            <Text style={styles.quoteAuthor}>— Happy Developer</Text>
          </CardContent>
        </Card>
      </MasonryItem>
      <MasonryItem>
        <View style={[styles.statBlock, { backgroundColor: '#f3f4f6' }]}>
          <Text style={styles.statNumber}>10K+</Text>
          <Text style={styles.statLabel}>Downloads</Text>
        </View>
      </MasonryItem>
      <MasonryItem>
        <Card variant="elevated" padding="md">
          <CardContent>
            <Text style={styles.mixedTitleHeading}>Feature Highlight</Text>
            <Text style={styles.cardDescription}>
              Masonry layout supports any type of content, from cards to images to custom components.
            </Text>
          </CardContent>
        </Card>
      </MasonryItem>
      <MasonryItem>
        <View style={[styles.colorBlock, { backgroundColor: '#8b5cf6', height: 180 }]}>
          <Text style={styles.colorBlockText}>Tall Block</Text>
        </View>
      </MasonryItem>
    </Masonry>
  ),
};

const styles = StyleSheet.create({
  container: {
    maxHeight: 600,
  },
  cardHeader: {
    height: 80,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardNumber: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  cardTitle: {
    marginBottom: 8,
  },
  cardTitleHeading: {
    marginBottom: 8,
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  cardDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  smallCardHeader: {
    height: 40,
    borderRadius: 6,
    marginBottom: 8,
  },
  smallCardTitle: {
    fontSize: 14,
  },
  imageCard: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  imagePlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageNumber: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
  },
  postTitle: {
    marginTop: 12,
    marginBottom: 8,
  },
  postTitleHeading: {
    marginTop: 12,
    marginBottom: 8,
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  postExcerpt: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  postMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  postAuthor: {
    fontSize: 13,
    fontWeight: '500',
    color: '#374151',
  },
  postDot: {
    fontSize: 13,
    color: '#9ca3af',
    marginHorizontal: 6,
  },
  postDate: {
    fontSize: 13,
    color: '#6b7280',
  },
  postReadTime: {
    fontSize: 13,
    color: '#6b7280',
  },
  productImage: {
    height: 120,
    position: 'relative',
  },
  featuredBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
  },
  productContent: {
    padding: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#3b82f6',
    marginBottom: 8,
  },
  productRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingStars: {
    color: '#f59e0b',
    fontSize: 14,
  },
  ratingText: {
    fontSize: 13,
    color: '#6b7280',
  },
  itemNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  smallDescription: {
    fontSize: 13,
    color: '#6b7280',
  },
  mixedTitle: {
    marginTop: 8,
    marginBottom: 8,
  },
  mixedTitleHeading: {
    marginTop: 8,
    marginBottom: 8,
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  colorBlock: {
    height: 120,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorBlockText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  quoteText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#374151',
    lineHeight: 24,
    marginBottom: 12,
  },
  quoteAuthor: {
    fontSize: 14,
    color: '#6b7280',
  },
  statBlock: {
    height: 100,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  headingStyle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
});
