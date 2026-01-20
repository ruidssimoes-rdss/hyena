import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import {
  Footer,
  FooterContent,
  FooterBrand,
  FooterLinks,
  FooterLinkGroup,
  FooterLink,
  FooterSocial,
  FooterCopyright,
  FooterNewsletter,
  Button,
  colors,
} from '@r-ui/react-native';

const meta: Meta<typeof Footer> = {
  title: 'Components/Navigation/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof Footer>;

// ============================================================================
// Helper Components
// ============================================================================

const Logo = () => (
  <View style={logoStyles.container}>
    <View style={logoStyles.icon}>
      <Text style={logoStyles.iconText}>R</Text>
    </View>
  </View>
);

const TwitterIcon = () => <Text style={socialStyles.icon}>𝕏</Text>;
const GitHubIcon = () => <Text style={socialStyles.icon}>⌘</Text>;
const LinkedInIcon = () => <Text style={socialStyles.icon}>in</Text>;
const YouTubeIcon = () => <Text style={socialStyles.icon}>▶</Text>;
const InstagramIcon = () => <Text style={socialStyles.icon}>📷</Text>;

// ============================================================================
// Simple (Copyright Only)
// ============================================================================

export const Simple: Story = {
  decorators: [
    (Story) => (
      <View style={decoratorStyles.container}>
        <View style={decoratorStyles.content}>
          <Text style={decoratorStyles.contentText}>Page content</Text>
        </View>
        <Story />
      </View>
    ),
  ],
  render: () => (
    <Footer variant="simple">
      <FooterCopyright companyName="Acme Inc" />
    </Footer>
  ),
};

// ============================================================================
// With Link Columns
// ============================================================================

export const WithLinkColumns: Story = {
  decorators: [
    (Story) => (
      <View style={decoratorStyles.container}>
        <View style={decoratorStyles.content}>
          <Text style={decoratorStyles.contentText}>Page content</Text>
        </View>
        <Story />
      </View>
    ),
  ],
  render: () => (
    <Footer variant="columns">
      <FooterContent>
        <FooterBrand
          logo={<Logo />}
          name="R-UI"
          tagline="Build beautiful apps with our comprehensive design system for React Native and web."
        />
        <FooterLinks>
          <FooterLinkGroup title="Product">
            <FooterLink onPress={() => console.log('Features')}>Features</FooterLink>
            <FooterLink onPress={() => console.log('Pricing')}>Pricing</FooterLink>
            <FooterLink onPress={() => console.log('Changelog')}>Changelog</FooterLink>
            <FooterLink onPress={() => console.log('Roadmap')}>Roadmap</FooterLink>
          </FooterLinkGroup>
          <FooterLinkGroup title="Company">
            <FooterLink onPress={() => console.log('About')}>About</FooterLink>
            <FooterLink onPress={() => console.log('Blog')}>Blog</FooterLink>
            <FooterLink onPress={() => console.log('Careers')}>Careers</FooterLink>
            <FooterLink onPress={() => console.log('Press')}>Press</FooterLink>
          </FooterLinkGroup>
          <FooterLinkGroup title="Resources">
            <FooterLink onPress={() => console.log('Documentation')}>Documentation</FooterLink>
            <FooterLink onPress={() => console.log('API Reference')}>API Reference</FooterLink>
            <FooterLink onPress={() => console.log('Support')}>Support</FooterLink>
            <FooterLink onPress={() => console.log('Status')}>Status</FooterLink>
          </FooterLinkGroup>
          <FooterLinkGroup title="Legal">
            <FooterLink onPress={() => console.log('Privacy')}>Privacy</FooterLink>
            <FooterLink onPress={() => console.log('Terms')}>Terms</FooterLink>
            <FooterLink onPress={() => console.log('Cookies')}>Cookies</FooterLink>
            <FooterLink onPress={() => console.log('Licenses')}>Licenses</FooterLink>
          </FooterLinkGroup>
        </FooterLinks>
      </FooterContent>
      <FooterCopyright companyName="R-UI" />
    </Footer>
  ),
};

// ============================================================================
// With Newsletter Signup
// ============================================================================

export const WithNewsletter: Story = {
  decorators: [
    (Story) => (
      <View style={decoratorStyles.container}>
        <View style={decoratorStyles.content}>
          <Text style={decoratorStyles.contentText}>Page content</Text>
        </View>
        <Story />
      </View>
    ),
  ],
  render: function NewsletterStory() {
    const handleSubmit = (email: string) => {
      console.log('Newsletter signup:', email);
    };

    return (
      <Footer variant="columns">
        <FooterContent>
          <FooterBrand
            logo={<Logo />}
            name="R-UI"
            tagline="Join thousands of developers building with R-UI."
          />
          <FooterNewsletter
            title="Stay updated"
            description="Get the latest news and updates delivered to your inbox."
            placeholder="you@example.com"
            buttonText="Subscribe"
            onSubmit={handleSubmit}
          />
        </FooterContent>
        <FooterLinks>
          <FooterLinkGroup title="Product">
            <FooterLink onPress={() => {}}>Features</FooterLink>
            <FooterLink onPress={() => {}}>Pricing</FooterLink>
            <FooterLink onPress={() => {}}>Changelog</FooterLink>
          </FooterLinkGroup>
          <FooterLinkGroup title="Resources">
            <FooterLink onPress={() => {}}>Documentation</FooterLink>
            <FooterLink onPress={() => {}}>API Reference</FooterLink>
            <FooterLink onPress={() => {}}>Support</FooterLink>
          </FooterLinkGroup>
          <FooterLinkGroup title="Legal">
            <FooterLink onPress={() => {}}>Privacy</FooterLink>
            <FooterLink onPress={() => {}}>Terms</FooterLink>
          </FooterLinkGroup>
        </FooterLinks>
        <FooterCopyright companyName="R-UI" />
      </Footer>
    );
  },
};

// ============================================================================
// With Social Icons
// ============================================================================

export const WithSocialIcons: Story = {
  decorators: [
    (Story) => (
      <View style={decoratorStyles.container}>
        <View style={decoratorStyles.content}>
          <Text style={decoratorStyles.contentText}>Page content</Text>
        </View>
        <Story />
      </View>
    ),
  ],
  render: () => (
    <Footer variant="columns">
      <FooterContent>
        <FooterBrand
          logo={<Logo />}
          name="R-UI"
          tagline="Build beautiful apps faster."
        />
        <FooterLinks>
          <FooterLinkGroup title="Product">
            <FooterLink onPress={() => {}}>Features</FooterLink>
            <FooterLink onPress={() => {}}>Pricing</FooterLink>
          </FooterLinkGroup>
          <FooterLinkGroup title="Company">
            <FooterLink onPress={() => {}}>About</FooterLink>
            <FooterLink onPress={() => {}}>Careers</FooterLink>
          </FooterLinkGroup>
        </FooterLinks>
      </FooterContent>
      <View style={socialRowStyles.container}>
        <FooterCopyright companyName="R-UI" />
        <FooterSocial
          links={[
            { icon: <TwitterIcon />, onPress: () => console.log('Twitter'), label: 'Twitter' },
            { icon: <GitHubIcon />, onPress: () => console.log('GitHub'), label: 'GitHub' },
            { icon: <LinkedInIcon />, onPress: () => console.log('LinkedIn'), label: 'LinkedIn' },
            { icon: <YouTubeIcon />, onPress: () => console.log('YouTube'), label: 'YouTube' },
          ]}
        />
      </View>
    </Footer>
  ),
};

// ============================================================================
// With Logo
// ============================================================================

export const WithLogo: Story = {
  decorators: [
    (Story) => (
      <View style={decoratorStyles.container}>
        <View style={decoratorStyles.content}>
          <Text style={decoratorStyles.contentText}>Page content</Text>
        </View>
        <Story />
      </View>
    ),
  ],
  render: () => (
    <Footer variant="simple">
      <FooterContent>
        <View style={simpleRowStyles.row}>
          <FooterBrand
            logo={<Logo />}
            name="R-UI"
          />
          <FooterLinks style={{ flexDirection: 'row', gap: 24 }}>
            <FooterLink onPress={() => {}}>About</FooterLink>
            <FooterLink onPress={() => {}}>Blog</FooterLink>
            <FooterLink onPress={() => {}}>Careers</FooterLink>
            <FooterLink onPress={() => {}}>Contact</FooterLink>
          </FooterLinks>
          <FooterSocial
            links={[
              { icon: <TwitterIcon />, onPress: () => {}, label: 'Twitter' },
              { icon: <GitHubIcon />, onPress: () => {}, label: 'GitHub' },
              { icon: <LinkedInIcon />, onPress: () => {}, label: 'LinkedIn' },
            ]}
          />
        </View>
      </FooterContent>
      <FooterCopyright companyName="R-UI" />
    </Footer>
  ),
};

// ============================================================================
// Centered Variant
// ============================================================================

export const Centered: Story = {
  decorators: [
    (Story) => (
      <View style={decoratorStyles.container}>
        <View style={decoratorStyles.content}>
          <Text style={decoratorStyles.contentText}>Page content</Text>
        </View>
        <Story />
      </View>
    ),
  ],
  render: () => (
    <Footer variant="centered">
      <FooterBrand
        logo={<Logo />}
        name="R-UI"
        tagline="Building the future of UI development."
      />
      <FooterLinks>
        <FooterLink onPress={() => {}}>About</FooterLink>
        <FooterLink onPress={() => {}}>Features</FooterLink>
        <FooterLink onPress={() => {}}>Pricing</FooterLink>
        <FooterLink onPress={() => {}}>Documentation</FooterLink>
        <FooterLink onPress={() => {}}>Contact</FooterLink>
      </FooterLinks>
      <FooterSocial
        links={[
          { icon: <TwitterIcon />, onPress: () => {}, label: 'Twitter' },
          { icon: <GitHubIcon />, onPress: () => {}, label: 'GitHub' },
          { icon: <LinkedInIcon />, onPress: () => {}, label: 'LinkedIn' },
          { icon: <YouTubeIcon />, onPress: () => {}, label: 'YouTube' },
        ]}
      />
      <FooterCopyright companyName="R-UI" />
    </Footer>
  ),
};

// ============================================================================
// Dark Variant
// ============================================================================

export const DarkVariant: Story = {
  decorators: [
    (Story) => (
      <View style={decoratorStyles.container}>
        <View style={decoratorStyles.content}>
          <Text style={decoratorStyles.contentText}>Page content</Text>
        </View>
        <Story />
      </View>
    ),
  ],
  render: () => (
    <Footer
      variant="columns"
      style={{
        backgroundColor: '#0a0a0a',
      }}
    >
      <FooterContent>
        <FooterBrand
          logo={
            <View style={[logoStyles.icon, { backgroundColor: colors.white }]}>
              <Text style={[logoStyles.iconText, { color: '#0a0a0a' }]}>R</Text>
            </View>
          }
          name="R-UI"
          tagline="The modern design system for React Native."
          style={{ gap: 8 }}
        />
        <FooterLinks>
          <FooterLinkGroup title="Product">
            <FooterLink style={{ color: '#888' }} onPress={() => {}}>Features</FooterLink>
            <FooterLink style={{ color: '#888' }} onPress={() => {}}>Pricing</FooterLink>
            <FooterLink style={{ color: '#888' }} onPress={() => {}}>Changelog</FooterLink>
          </FooterLinkGroup>
          <FooterLinkGroup title="Company">
            <FooterLink style={{ color: '#888' }} onPress={() => {}}>About</FooterLink>
            <FooterLink style={{ color: '#888' }} onPress={() => {}}>Blog</FooterLink>
            <FooterLink style={{ color: '#888' }} onPress={() => {}}>Careers</FooterLink>
          </FooterLinkGroup>
          <FooterLinkGroup title="Legal">
            <FooterLink style={{ color: '#888' }} onPress={() => {}}>Privacy</FooterLink>
            <FooterLink style={{ color: '#888' }} onPress={() => {}}>Terms</FooterLink>
          </FooterLinkGroup>
        </FooterLinks>
      </FooterContent>
      <View style={[socialRowStyles.container, { borderTopColor: '#222' }]}>
        <FooterCopyright companyName="R-UI" style={{ color: '#666' }} />
        <FooterSocial
          links={[
            { icon: <TwitterIcon />, onPress: () => {}, label: 'Twitter' },
            { icon: <GitHubIcon />, onPress: () => {}, label: 'GitHub' },
            { icon: <LinkedInIcon />, onPress: () => {}, label: 'LinkedIn' },
          ]}
          style={{ gap: 8 }}
        />
      </View>
    </Footer>
  ),
};

// ============================================================================
// E-commerce Example
// ============================================================================

export const EcommerceExample: Story = {
  decorators: [
    (Story) => (
      <View style={decoratorStyles.container}>
        <View style={decoratorStyles.content}>
          <Text style={decoratorStyles.contentText}>Shop content</Text>
        </View>
        <Story />
      </View>
    ),
  ],
  render: () => (
    <Footer variant="columns">
      <FooterContent>
        <FooterBrand
          logo={
            <Text style={{ fontSize: 24, fontWeight: '700', color: colors.text.primary }}>
              ShopName
            </Text>
          }
          tagline="Your one-stop shop for everything you need."
        />
        <FooterNewsletter
          title="Join our newsletter"
          description="Get exclusive deals and early access to new products."
          placeholder="Enter your email"
          buttonText="Join"
          onSubmit={(email) => console.log('Subscribe:', email)}
        />
      </FooterContent>
      <FooterLinks>
        <FooterLinkGroup title="Shop">
          <FooterLink onPress={() => {}}>New Arrivals</FooterLink>
          <FooterLink onPress={() => {}}>Best Sellers</FooterLink>
          <FooterLink onPress={() => {}}>Sale</FooterLink>
          <FooterLink onPress={() => {}}>Collections</FooterLink>
        </FooterLinkGroup>
        <FooterLinkGroup title="Customer Service">
          <FooterLink onPress={() => {}}>Contact Us</FooterLink>
          <FooterLink onPress={() => {}}>Shipping Info</FooterLink>
          <FooterLink onPress={() => {}}>Returns</FooterLink>
          <FooterLink onPress={() => {}}>FAQ</FooterLink>
        </FooterLinkGroup>
        <FooterLinkGroup title="Company">
          <FooterLink onPress={() => {}}>About Us</FooterLink>
          <FooterLink onPress={() => {}}>Careers</FooterLink>
          <FooterLink onPress={() => {}}>Sustainability</FooterLink>
          <FooterLink onPress={() => {}}>Stores</FooterLink>
        </FooterLinkGroup>
      </FooterLinks>
      <View style={ecommerceStyles.bottom}>
        <View style={ecommerceStyles.payment}>
          <Text style={ecommerceStyles.paymentLabel}>We accept:</Text>
          <View style={ecommerceStyles.paymentIcons}>
            <Text style={ecommerceStyles.paymentIcon}>💳</Text>
            <Text style={ecommerceStyles.paymentIcon}>💳</Text>
            <Text style={ecommerceStyles.paymentIcon}>💳</Text>
            <Text style={ecommerceStyles.paymentIcon}>💳</Text>
          </View>
        </View>
        <FooterCopyright companyName="ShopName" />
        <FooterSocial
          links={[
            { icon: <InstagramIcon />, onPress: () => {}, label: 'Instagram' },
            { icon: <TwitterIcon />, onPress: () => {}, label: 'Twitter' },
            { icon: <YouTubeIcon />, onPress: () => {}, label: 'YouTube' },
          ]}
        />
      </View>
    </Footer>
  ),
};

// ============================================================================
// Minimal SaaS Example
// ============================================================================

export const MinimalSaaS: Story = {
  decorators: [
    (Story) => (
      <View style={decoratorStyles.container}>
        <View style={decoratorStyles.content}>
          <Text style={decoratorStyles.contentText}>App content</Text>
        </View>
        <Story />
      </View>
    ),
  ],
  render: () => (
    <Footer variant="simple" style={{ paddingVertical: 24 }}>
      <View style={minimalStyles.row}>
        <View style={minimalStyles.left}>
          <FooterBrand
            logo={<Logo />}
            name="AppName"
          />
        </View>
        <FooterLinks style={{ flexDirection: 'row', gap: 32 }}>
          <FooterLink onPress={() => {}}>Privacy</FooterLink>
          <FooterLink onPress={() => {}}>Terms</FooterLink>
          <FooterLink onPress={() => {}}>Status</FooterLink>
          <FooterLink onPress={() => {}}>Help</FooterLink>
        </FooterLinks>
        <FooterCopyright companyName="AppName" style={{ marginLeft: 'auto' }} />
      </View>
    </Footer>
  ),
};

// ============================================================================
// Styles
// ============================================================================

const decoratorStyles = StyleSheet.create({
  container: {
    minHeight: 600,
    backgroundColor: colors.bg.base,
    justifyContent: 'flex-end',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: {
    color: colors.text.secondary,
    fontSize: 14,
  },
});

const logoStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  icon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.accent.blue.DEFAULT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
  },
});

const socialStyles = StyleSheet.create({
  icon: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.secondary,
  },
});

const socialRowStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 24,
    marginTop: 24,
    borderTopWidth: 1,
    borderTopColor: colors.border.default,
  },
});

const simpleRowStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    gap: 24,
    flexWrap: 'wrap',
  },
});

const ecommerceStyles = StyleSheet.create({
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 24,
    marginTop: 24,
    borderTopWidth: 1,
    borderTopColor: colors.border.default,
    flexWrap: 'wrap',
    gap: 16,
  },
  payment: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  paymentLabel: {
    fontSize: 13,
    color: colors.text.muted,
  },
  paymentIcons: {
    flexDirection: 'row',
    gap: 8,
  },
  paymentIcon: {
    fontSize: 24,
  },
});

const minimalStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: 24,
  },
  left: {
    marginRight: 24,
  },
});
