# Component Standards & Best Practices

This document outlines the standards and best practices for creating and documenting components in this library, optimized for AI website builders (like Lovable, V0, etc.).

## Component Implementation Standards

### 1. Accessibility (a11y)

#### Interactive Components (Buttons, Links)
- `ariaLabel?: string` - Optional ARIA label for screen readers (with sensible default fallback)
- `type?: "button" | "submit" | "reset"` - Semantic button type (default: `"button"`)
- `disabled?: boolean` - Disabled state (default: `false`)

**Example:**
```tsx
interface ButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
  type?: "button" | "submit" | "reset";
}

const Button = ({
  text,
  onClick,
  className = "",
  disabled = false,
  ariaLabel,
  type = "button",
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel || text}
      className={cls(
        "...",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
    >
      {text}
    </button>
  );
};
```

#### Media Components (Images, Videos)

**Images:**
- `imageAlt?: string` - Alt text for images (empty string for decorative images)
- When `imageAlt=""`, add `aria-hidden={true}` to mark as decorative

**Videos:**
- `videoAriaLabel?: string` - ARIA label for video elements (with sensible default)

**Example:**
```tsx
interface HeroProps {
  imageSrc?: string;
  imageAlt?: string;
  videoSrc?: string;
  videoAriaLabel?: string;
}

const Hero = ({
  imageSrc,
  imageAlt = "",
  videoSrc,
  videoAriaLabel = "Hero video",
}: HeroProps) => {
  return (
    <>
      {videoSrc ? (
        <video
          src={videoSrc}
          aria-label={videoAriaLabel}
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        imageSrc && (
          <Image
            src={imageSrc}
            alt={imageAlt}
            aria-hidden={imageAlt === ""}
          />
        )
      )}
    </>
  );
};
```

#### Sections
- Use semantic HTML (`<section>`, `<header>`, `<nav>`, `<footer>`)
- Add `ariaLabel` with sensible defaults (e.g., "Hero section", "Navigation")
- **Vertical Spacing**: All sections except heroes and footers should have `py-30` for consistent spacing
- **Content Width Pattern**: All section content must follow this structure:
  - Section: `w-full py-30` (full width section with vertical padding)
  - Inner div: `w-content-width mx-auto` (centered content with max width)

```tsx
<section aria-label={ariaLabel || "Hero section"} className="w-full py-30">
  <div className="w-content-width mx-auto">
    {/* content */}
  </div>
</section>
```

**Note**: Heroes and footers do NOT use `py-30` as they have their own spacing requirements.

#### Responsive Breakpoints
- **Mobile styles**: Default styles (no prefix) should be for mobile devices
- **Desktop styles**: Use `lg:` prefix for desktop breakpoints (not `md:`)
- This ensures mobile-first design up to the `lg` breakpoint (1024px)

**Example:**
```tsx
// ✅ Correct - Mobile until lg breakpoint
<div className="flex-col lg:flex-row">
  <img className="w-full h-auto lg:h-8 lg:w-auto" />
</div>

// ❌ Wrong - Using md: breakpoint
<div className="flex-col md:flex-row">
  <img className="w-full h-auto md:h-8 md:w-auto" />
</div>
```

#### Smooth Scrolling with ReactLenis
- **All preview pages** should use ReactLenis for smooth scrolling
- **Wrapper order**: ThemeProvider > ReactLenis root > Component
- This ensures consistent scroll behavior across all component demonstrations

**Example:**
```tsx
"use client";

import ReactLenis from "lenis/react";
import ComponentName from "@/components/sections/ComponentName";
import { ThemeProvider } from "@/providers/ThemeProvider";

export default function ComponentPage() {
  return (
    <ThemeProvider defaultButtonVariant="text-stagger" defaultTextAnimation="entrance-slide" borderRadius="rounded">
      <ReactLenis root>
        <ComponentName {...props} />
      </ReactLenis>
    </ThemeProvider>
  );
}
```

**Important:**
- ReactLenis must be wrapped **inside** ThemeProvider, not outside
- Use the `root` prop to enable smooth scrolling for the entire page
- Required for all preview pages in `/app/components/` directory

### 2. Prop Defaults

#### Required Props
- Core content props (e.g., `text`, `title`, `description`) should be **required**
- No default values for required props

#### Optional Props with Defaults
- `className`, `textClassName`, etc. → default: `""`
- `disabled` → default: `false`
- `type` → default: `"button"`
- Component-specific props (e.g., `strengthFactor`) → document the default

**Empty string defaults for className props:**
```tsx
className = "",
textClassName = "",
iconClassName = "",
```

These prevent undefined checks and are standard practice.

### 3. Component Customizability

**Provide className props for all major elements** to allow full styling control:

```tsx
interface SectionProps {
  title: string;
  description: string;
  // Main wrapper
  className?: string;
  // Inner container
  containerClassName?: string;
  // Content areas
  textClassName?: string;
  mediaWrapperClassName?: string;
  imageClassName?: string;
}

const Section = ({
  title,
  description,
  className = "",
  containerClassName = "",
  textClassName = "",
  mediaWrapperClassName = "",
  imageClassName = "",
}: SectionProps) => {
  return (
    <section className={cls("base-section-styles", className)}>
      <div className={cls("base-container-styles", containerClassName)}>
        <div className={cls("base-text-styles", textClassName)}>
          {/* content */}
        </div>
        <div className={cls("base-media-wrapper-styles", mediaWrapperClassName)}>
          <img className={cls("base-image-styles", imageClassName)} />
        </div>
      </div>
    </section>
  );
};
```

**Naming convention:**
- `className` - Main wrapper element
- `containerClassName` - Inner container
- `[element]ClassName` - Specific elements (e.g., `textClassName`, `imageClassName`, `mediaWrapperClassName`)

### 4. Component Composition & Base Styles

When composing higher-level components from base components, **set sensible base styles** while still accepting className overrides:

```tsx
interface HeroProps {
  title: string;
  description: string;
  titleClassName?: string;
  descriptionClassName?: string;
  textBoxClassName?: string;
}

const Hero = ({
  title,
  description,
  titleClassName = "",
  descriptionClassName = "",
  textBoxClassName = "",
}: HeroProps) => {
  return (
    <section>
      <TextBox
        title={title}
        description={description}
        // Set base styles, allow overrides
        className={cls("flex flex-col gap-3 md:gap-1", textBoxClassName)}
        titleClassName={cls("text-6xl font-medium", titleClassName)}
        descriptionClassName={cls("text-lg leading-[1.2]", descriptionClassName)}
        center={true}
      />
    </section>
  );
};
```

**Key principles:**
- Base styles come first in `cls()`, overrides second
- This ensures good defaults while maintaining full customizability
- AI builders can use components without styling knowledge, but advanced users can override
- Use `cls()` utility for proper class merging

### 5. Component Structure

```tsx
"use client";

import React from "react";
import { cls } from "@/lib/utils";

interface ComponentProps {
  // Required props first
  text: string;
  // Optional props with explicit types
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
  type?: "button" | "submit" | "reset";
}

const Component = ({
  text,
  onClick,
  className = "",
  disabled = false,
  ariaLabel,
  type = "button",
}: ComponentProps) => {
  return (
    <element
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel || text}
      className={cls("base-classes", "disabled-states", className)}
    >
      {text}
    </element>
  );
};

Component.displayName = "Component";

export default React.memo(Component);
```

### 4. Type Safety

- Use explicit prop interfaces (no `React.ComponentPropsWithoutRef` overcomplication)
- Use discriminated unions for variant-based components
- Export reusable types for component composition

### 5. Color & Theming Standards

**Always use CSS custom properties for colors** to ensure theme consistency:

```tsx
// ✅ Correct - Uses theme variables
<div className="bg-background text-foreground">
  <button className="bg-foreground text-background">Click me</button>
</div>

// ❌ Wrong - Hardcoded colors break theming
<div className="bg-white text-black">
  <button className="bg-black text-white">Click me</button>
</div>
```

**Standard color variables:**
- `bg-background` - Main background color
- `text-foreground` - Main text color
- `bg-foreground` - Inverse background (for buttons, accents)
- `text-background` - Inverse text (for button text on dark buttons)
- `card` - Card/surface background with border

**When to use:**
- Always prefer theme variables over hardcoded colors (`white`, `black`, `gray-100`, etc.)
- This ensures proper dark mode support and theme customization
- Only use hardcoded colors for very specific one-off cases with clear justification

### 6. Naming Conventions

#### Prop Naming Standards

**Section components (Hero, About, Feature, etc.):**
- Use `title` for primary heading text
- Use `description` for secondary/body text
- ❌ DO NOT use: `heading`, `subtitle`, `text` for section headings

**Button components:**
- Use `text` for button label
- ❌ DO NOT use: `title`, `label` for button text

**Example - Correct naming:**
```tsx
// Section component
interface HeroProps {
  title: string;           // ✅ Main heading
  description: string;     // ✅ Supporting text
  buttons?: ButtonConfig[];
}

// Button component
interface ButtonProps {
  text: string;            // ✅ Button label
  onClick?: () => void;
}

// Button config in sections
interface ButtonConfig {
  text: string;            // ✅ Button label
  href?: string;
  onClick?: () => void;
}
```

**Example - Incorrect naming:**
```tsx
// ❌ Wrong
interface HeroProps {
  heading: string;         // Should be "title"
  subtitle: string;        // Should be "description"
  text: string;            // Ambiguous - use "title" or "description"
}
```

**Consistency is critical:**
- All hero sections must use the same prop names
- All about sections must use the same prop names
- Registry documentation must match component prop names exactly

### 6. Text Constraints

For button text:
- `minChars: 2`
- `maxChars: 15`
- Single-line only (no multiline support)

### 7. Theme Provider Pattern

All sections and components use a centralized ThemeProvider to maintain consistent styling across the entire site.

#### ThemeProvider Setup

**Location:** `@/providers/ThemeProvider`

**Usage:** Wrap the entire app/page (not individual sections) in a single ThemeProvider:

```tsx
import { ThemeProvider } from "@/providers/ThemeProvider";

export default function Page() {
  return (
    <ThemeProvider
      defaultButtonVariant="text-stagger"
      defaultTextAnimation="entrance-slide"
    >
      <HeroBillboard {...props} />
      <FeatureSection {...props} />
      <Footer {...props} />
    </ThemeProvider>
  );
}
```

#### Configuration

**defaultButtonVariant:** Controls the button style for ALL buttons in sections
- Options: `"text-stagger" | "shift-hover" | "slide-background" | "icon-arrow" | "hover-magnetic"`
- Default: `"text-stagger"`

**defaultTextAnimation:** Controls the text animation type for ALL text in sections
- Options: `"entrance-slide" | "reveal-blur" | "background-highlight"`
- Default: `"entrance-slide"`

#### Important Rules

❌ **DO NOT** specify button `variant` in section button configs - it's controlled by ThemeProvider
❌ **DO NOT** wrap individual sections in ThemeProvider - use ONE provider per site/page
✅ **DO** wrap the entire app/page in a single ThemeProvider
✅ **DO** let all sections inherit theme defaults automatically

#### How Components Use Theme

**TextBox component:**
- Uses `useTheme()` hook to get default button variant and text animation
- Automatically applies defaults when not explicitly specified
- Button variant: `const variant = theme.defaultButtonVariant`
- Text animation: `const animationType = type || theme.defaultTextAnimation`

**Section components (HeroBillboard, HeroSplit, etc.):**
- Do NOT accept `variant` or `type` props
- Pass through to TextBox which handles theme defaults
- Ensures all sections maintain consistent styling

**ButtonConfig interface:**
```tsx
interface ButtonConfig {
  text: string;
  onClick?: () => void;
  href?: string;
  props?: Partial<ButtonPropsForVariant<CTAButtonVariant>>;
  // NO variant property - controlled by ThemeProvider
}
```

## Registry Documentation Standards

### 1. Registry Structure

```json
{
  "componentRegistry": {
    "button": [...],
    "text": [...],
    "navbar": [...]
  },
  "sectionRegistry": {
    "hero": [...],
    "about": [...],
    "feature": [...],
    ...
  }
}
```

### 2. Component Entry Format

```json
{
  "import": "import ComponentName from '@/components/category/ComponentName';",
  "name": "ComponentName",
  "path": "@/components/category/ComponentName",
  "description": "Brief one-line description of what the component is.",
  "details": "Longer description of when to use it, behavior, and constraints.",
  "constraints": {
    "textRules": {
      "text": {
        "required": true,
        "example": "Example text",
        "minChars": 2,
        "maxChars": 15
      }
    }
  },
  "propsSchema": {
    "text": "string",
    "onClick?": "() => void",
    "className?": "string",
    "disabled?": "boolean (default: false)",
    "ariaLabel?": "string",
    "type?": "'button' | 'submit' | 'reset' (default: 'button')"
  },
  "usage": "<ComponentName text=\"Example\" onClick={() => console.log('clicked')} />"
}
```

### 3. propsSchema Rules

#### Format
- **Required props**: `"propName": "type"`
- **Optional props**: `"propName?": "type"`
- **Optional props with defaults**: `"propName?": "type (default: value)"`

#### Examples
```json
"text": "string",
"onClick?": "() => void",
"className?": "string",
"disabled?": "boolean (default: false)",
"type?": "'button' | 'submit' | 'reset' (default: 'button')",
"strengthFactor?": "number (default: 20)",
"hoverBgColor?": "string (default: 'after:bg-background')"
```

### 4. Usage Examples

Provide a single-line usage example showing typical implementation:

```json
"usage": "<ButtonTextStagger text=\"Get Started\" onClick={() => console.log('clicked')} />"
```

- Use realistic prop values
- Show the most common use case
- Keep it concise (one line)
- Include onClick handler for interactive components

### 5. Description Guidelines

#### description
- One-line summary of what the component is
- Focus on visual/behavioral characteristics
- Example: "CTA button with character stagger animation on hover."

#### details
- When to use it
- Key behavior notes
- Important constraints
- Example: "Use for primary or secondary CTAs where subtle text motion adds emphasis. On hover, the label's characters animate in sequence (stagger). Includes background styling."

### 6. What NOT to Include

❌ **Metadata field** - Unnecessary complexity
❌ **Verbose descriptions** - Keep descriptions concise and obvious
❌ **Dependencies** - AI builders can infer from imports
❌ **Animation details** - Only mention if critical to usage decision
❌ **Over-documentation** - If it's obvious from the name, skip it

### 7. What TO Include

✅ **Default values in propsSchema** - Critical for AI to generate correct code
✅ **Usage examples** - Helps AI understand context
✅ **Text constraints** - Min/max character limits
✅ **Accurate descriptions** - Ensure description matches actual component behavior
✅ **Use case guidance** - When to use this vs alternatives

## Checklist for New Components

### Implementation
- [ ] Add accessibility props:
  - [ ] Interactive: `ariaLabel`, `type`, `disabled`
  - [ ] Media: `imageAlt`, `videoAriaLabel` with `aria-hidden` for decorative images
  - [ ] Sections: `ariaLabel` with sensible default
- [ ] Add disabled state styling (`disabled:cursor-not-allowed disabled:opacity-50`)
- [ ] Use explicit prop interfaces
- [ ] Set appropriate defaults for optional props
- [ ] Provide className props for all major elements (customizability)
- [ ] Use semantic HTML tags (`<section>`, `<button>`, etc.)
- [ ] Add `displayName` for debugging
- [ ] Wrap in `React.memo()` for performance
- [ ] Use "use client" directive if needed

### Registry
- [ ] Add to correct category (componentRegistry or sectionRegistry)
- [ ] Write accurate description matching actual behavior
- [ ] Document all props in propsSchema
- [ ] Include default values in propsSchema format
- [ ] Add usage example
- [ ] Set text constraints (min/max chars)
- [ ] Verify all types match component implementation

### Validation
- [ ] Component names match file names
- [ ] Variant names (if any) match types.ts
- [ ] Registry propsSchema matches actual component props
- [ ] Default values in registry match component defaults
- [ ] Usage example is valid syntax
- [ ] Description accurately reflects component styling/behavior
