const languages: Record<string, Record<string, string>> = {
    en: {
        'common.loading': 'Loading...',
        'common.unavailable': 'Unavailable',
        'common.stale': 'Stale Data',
        'common.on': 'ON',
        'common.off': 'OFF',
        'card.live_power': 'Live Power',
        'card.session': 'Session',
        'card.today': 'Today',
        'card.cost_today': 'Cost Today',
        'card.auto_off_in': 'Auto-off in',
        'card.cancel': 'Cancel',
        'card.auto_off_disabled': 'Auto-off Disabled',
        'card.disable_auto_off': 'Disable Auto-off',
        'card.high_power': 'High Power Usage',
        'card.on_since': 'On since {time}',
        'card.running_for': 'Running for {minutes}m {seconds}s',
        'card.last_used': 'Last used today at {time}',
        'card.just_now': 'Just now',
        'card.minutes_ago': '{minutes} minutes ago',
        'modal.current_power': 'Current Power',
        'modal.session_energy': 'Session Energy',
        'modal.modes': 'Modes',
        'modal.cancel_timer': 'Cancel Timer'
    }
};

export function localize(key: string, search?: string, replace?: string): string {
    const lang = (window as any).customCards?.activeLang || 'en';
    let translated: string = languages[lang]?.[key] || languages['en'][key] || key;

    if (search && replace) {
        translated = translated.replace(search, replace);
    }
    return translated;
}
