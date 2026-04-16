const isEnabled = import.meta.env.VITE_ENABLE_ANALYTICS === 'true';

export const analytics = {
  track: (eventName, properties = {}) => {
    if (!isEnabled) return;
    
    console.log('[Analytics]', eventName, {
      ...properties,
      timestamp: new Date().toISOString(),
      url: window.location.pathname
    });
  },

  pageView: (pageName) => {
    analytics.track('page_view', { page: pageName });
  },

  formStart: () => {
    analytics.track('form_start');
  },

  formStepComplete: (step, data) => {
    analytics.track('form_step_complete', { step, ...data });
  },

  formSubmit: (data) => {
    analytics.track('form_submit', {
      age: data.age,
      goal: data.goal
    });
  },

  resultsView: (options) => {
    analytics.track('results_view', {
      optionCount: options?.length || 0
    });
  },

  regenerateClick: () => {
    analytics.track('regenerate_click');
  },

  saveClick: () => {
    analytics.track('save_click');
  },

  shareClick: () => {
    analytics.track('share_click');
  },

  goalSelected: (goal) => {
    analytics.track('goal_selected', { goal });
  }
};
