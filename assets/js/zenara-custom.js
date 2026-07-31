/**
 * ZENNARA Custom JavaScript
 * Handles all interactive functionality for the ZENNARA website
 */

(function($) {
    'use strict';

    // Wait for DOM to be ready
    $(document).ready(function() {
        
        // Initialize all components
        initPreloader();
        initNavigation();
        initSmoothScroll();
        initFAQAccordion();
        initContactForm();
        initNewsletterForm();
        initPortalLoginForm();
        initInsightsFilters();
        initScrollAnimations();
        
    });

    /**
     * Preloader
     */
    function initPreloader() {
        $(window).on('load', function() {
            $('#preloader').fadeOut('slow', function() {
                $(this).remove();
            });
        });
    }

    /**
     * Mobile Navigation Toggle
     */
    function initNavigation() {
        const navToggle = $('#navToggle');
        const navMenu = $('#navMenu');
        const body = $('body');

        // Toggle mobile menu
        navToggle.on('click', function() {
            $(this).toggleClass('active');
            navMenu.toggleClass('active');
            body.toggleClass('nav-open');
        });

        // Close menu when clicking outside
        $(document).on('click', function(e) {
            if (!$(e.target).closest('.zenara-nav').length) {
                navToggle.removeClass('active');
                navMenu.removeClass('active');
                body.removeClass('nav-open');
            }
        });

        // Close menu when clicking on a link
        navMenu.find('a').on('click', function() {
            if ($(window).width() <= 992) {
                navToggle.removeClass('active');
                navMenu.removeClass('active');
                body.removeClass('nav-open');
            }
        });

        // Dropdown toggle on mobile
        $('.nav-dropdown > a').on('click', function(e) {
            if ($(window).width() <= 992) {
                e.preventDefault();
                $(this).parent().toggleClass('active');
                $(this).next('.dropdown-menu').slideToggle(300);
            }
        });

        // Sticky header on scroll
        let lastScroll = 0;
        $(window).on('scroll', function() {
            const currentScroll = $(this).scrollTop();
            const header = $('.zenara-header');

            if (currentScroll > 100) {
                header.addClass('scrolled');
            } else {
                header.removeClass('scrolled');
            }

            lastScroll = currentScroll;
        });
    }

    /**
     * Smooth Scroll for Anchor Links
     */
    function initSmoothScroll() {
        $('a[href^="#"]').on('click', function(e) {
            const target = $(this.getAttribute('href'));
            
            if (target.length) {
                e.preventDefault();
                $('html, body').stop().animate({
                    scrollTop: target.offset().top - 80
                }, 1000, 'swing');
            }
        });
    }

    /**
     * FAQ Accordion
     */
    function initFAQAccordion() {
        $('.faq-question').on('click', function() {
            const faqItem = $(this).parent('.faq-item');
            const faqAnswer = $(this).next('.faq-answer');
            
            // Close other open items
            $('.faq-item').not(faqItem).removeClass('active');
            $('.faq-answer').not(faqAnswer).slideUp(300);
            
            // Toggle current item
            faqItem.toggleClass('active');
            faqAnswer.slideToggle(300);
        });
    }

    /**
     * Contact Form Handling
     */
    function initContactForm() {
        const contactForm = $('#contactForm');
        
        if (contactForm.length) {
            contactForm.on('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const formData = {
                    firstName: $('#firstName').val().trim(),
                    lastName: $('#lastName').val().trim(),
                    email: $('#email').val().trim(),
                    phone: $('#phone').val().trim(),
                    country: $('#country').val(),
                    service: $('#service').val(),
                    propertyType: $('#propertyType').val(),
                    message: $('#message').val().trim(),
                    consent: $('#consent').is(':checked')
                };

                // Validate
                if (!validateContactForm(formData)) {
                    return;
                }

                // Show loading state
                const submitBtn = contactForm.find('button[type="submit"]');
                const originalText = submitBtn.text();
                submitBtn.prop('disabled', true).text('Sending...');

                // TODO: Send to backend API
                // Example API call:
                /*
                $.ajax({
                    url: '/api/contact',
                    method: 'POST',
                    data: JSON.stringify(formData),
                    contentType: 'application/json',
                    success: function(response) {
                        showFormMessage('success', 'Thank you! We\'ll get back to you within 24 hours.');
                        contactForm[0].reset();
                    },
                    error: function(xhr, status, error) {
                        showFormMessage('error', 'Something went wrong. Please try again or contact us directly.');
                    },
                    complete: function() {
                        submitBtn.prop('disabled', false).text(originalText);
                    }
                });
                */

                // Temporary success message (remove when backend is integrated)
                setTimeout(function() {
                    showFormMessage('success', 'Thank you! We\'ll get back to you within 24 hours. (Note: Form backend not yet integrated)');
                    contactForm[0].reset();
                    submitBtn.prop('disabled', false).text(originalText);
                }, 1000);
            });
        }
    }

    /**
     * Validate Contact Form
     */
    function validateContactForm(data) {
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showFormMessage('error', 'Please enter a valid email address.');
            return false;
        }

        // Phone validation (basic)
        if (data.phone.length < 10) {
            showFormMessage('error', 'Please enter a valid phone number.');
            return false;
        }

        // Required fields
        if (!data.firstName || !data.lastName || !data.country || !data.service || !data.message) {
            showFormMessage('error', 'Please fill in all required fields.');
            return false;
        }

        // Consent checkbox
        if (!data.consent) {
            showFormMessage('error', 'Please accept our privacy policy to continue.');
            return false;
        }

        return true;
    }

    /**
     * Show Form Message
     */
    function showFormMessage(type, message) {
        const messageDiv = $('#formMessage');
        messageDiv
            .removeClass('success error')
            .addClass(type)
            .text(message)
            .fadeIn(300);

        // Auto-hide after 5 seconds for success messages
        if (type === 'success') {
            setTimeout(function() {
                messageDiv.fadeOut(300);
            }, 5000);
        }
    }

    /**
     * Newsletter Form Handling
     */
    function initNewsletterForm() {
        const newsletterForm = $('#newsletterForm');
        
        if (newsletterForm.length) {
            newsletterForm.on('submit', function(e) {
                e.preventDefault();
                
                const email = $(this).find('input[type="email"]').val().trim();
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (!emailRegex.test(email)) {
                    alert('Please enter a valid email address.');
                    return;
                }

                const submitBtn = $(this).find('button[type="submit"]');
                const originalText = submitBtn.text();
                submitBtn.prop('disabled', true).text('Subscribing...');

                // TODO: Send to newsletter API
                /*
                $.ajax({
                    url: '/api/newsletter/subscribe',
                    method: 'POST',
                    data: JSON.stringify({ email: email }),
                    contentType: 'application/json',
                    success: function(response) {
                        alert('Thank you for subscribing!');
                        newsletterForm[0].reset();
                    },
                    error: function(xhr, status, error) {
                        alert('Something went wrong. Please try again.');
                    },
                    complete: function() {
                        submitBtn.prop('disabled', false).text(originalText);
                    }
                });
                */

                // Temporary success (remove when backend is integrated)
                setTimeout(function() {
                    alert('Thank you for subscribing! (Note: Newsletter backend not yet integrated)');
                    newsletterForm[0].reset();
                    submitBtn.prop('disabled', false).text(originalText);
                }, 1000);
            });
        }
    }

    /**
     * Portal Login Form Handling
     */
    function initPortalLoginForm() {
        const portalForm = $('#portalLoginForm');
        
        if (portalForm.length) {
            portalForm.on('submit', function(e) {
                e.preventDefault();
                
                const email = $('#portalEmail').val().trim();
                const password = $('#portalPassword').val();
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (!emailRegex.test(email)) {
                    alert('Please enter a valid email address.');
                    return;
                }

                if (password.length < 6) {
                    alert('Password must be at least 6 characters.');
                    return;
                }

                const submitBtn = $(this).find('button[type="submit"]');
                const originalText = submitBtn.text();
                submitBtn.prop('disabled', true).text('Signing In...');

                // TODO: Send to authentication API
                /*
                $.ajax({
                    url: '/api/auth/login',
                    method: 'POST',
                    data: JSON.stringify({ email: email, password: password }),
                    contentType: 'application/json',
                    success: function(response) {
                        // Redirect to dashboard
                        window.location.href = '/dashboard';
                    },
                    error: function(xhr, status, error) {
                        alert('Invalid credentials. Please try again.');
                        submitBtn.prop('disabled', false).text(originalText);
                    }
                });
                */

                // Temporary message (remove when backend is integrated)
                setTimeout(function() {
                    alert('Portal functionality coming soon in Q2 2026. Please contact your property manager for current reports.');
                    submitBtn.prop('disabled', false).text(originalText);
                }, 1000);
            });
        }
    }

    /**
     * Insights Page - Category Filters
     */
    function initInsightsFilters() {
        const filterBtns = $('.filter-btn');
        const articleCards = $('.article-card');

        if (filterBtns.length) {
            filterBtns.on('click', function() {
                const category = $(this).data('category');
                
                // Update active button
                filterBtns.removeClass('active');
                $(this).addClass('active');

                // Filter articles
                if (category === 'all') {
                    articleCards.fadeIn(300);
                } else {
                    articleCards.each(function() {
                        const cardCategory = $(this).data('category');
                        if (cardCategory === category) {
                            $(this).fadeIn(300);
                        } else {
                            $(this).fadeOut(300);
                        }
                    });
                }
            });
        }

        // Search functionality
        const searchInput = $('#insightsSearch');
        if (searchInput.length) {
            searchInput.on('keyup', function() {
                const searchTerm = $(this).val().toLowerCase();
                
                articleCards.each(function() {
                    const title = $(this).find('.article-title').text().toLowerCase();
                    const excerpt = $(this).find('.article-excerpt').text().toLowerCase();
                    
                    if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
                        $(this).fadeIn(300);
                    } else {
                        $(this).fadeOut(300);
                    }
                });
            });
        }
    }

    /**
     * Scroll Animations
     */
    function initScrollAnimations() {
        // Add fade-in animation class to elements
        const animateElements = $('.service-card, .coverage-card, .stat-item, .feature-card, .article-card');
        
        function checkScroll() {
            animateElements.each(function() {
                const elementTop = $(this).offset().top;
                const elementBottom = elementTop + $(this).outerHeight();
                const viewportTop = $(window).scrollTop();
                const viewportBottom = viewportTop + $(window).height();

                if (elementBottom > viewportTop && elementTop < viewportBottom) {
                    $(this).addClass('animate-in');
                }
            });
        }

        // Check on scroll
        $(window).on('scroll', checkScroll);
        // Check on load
        checkScroll();
    }

    /**
     * WhatsApp Click Tracking (for analytics)
     */
    $(document).on('click', 'a[href^="https://wa.me"]', function() {
        // TODO: Send event to analytics
        /*
        if (typeof gtag !== 'undefined') {
            gtag('event', 'whatsapp_click', {
                'event_category': 'engagement',
                'event_label': 'WhatsApp Contact'
            });
        }
        */
        console.log('WhatsApp link clicked');
    });

    /**
     * Phone Click Tracking (for analytics)
     */
    $(document).on('click', 'a[href^="tel:"]', function() {
        // TODO: Send event to analytics
        console.log('Phone link clicked');
    });

    /**
     * Email Click Tracking (for analytics)
     */
    $(document).on('click', 'a[href^="mailto:"]', function() {
        // TODO: Send event to analytics
        console.log('Email link clicked');
    });

})(jQuery);
