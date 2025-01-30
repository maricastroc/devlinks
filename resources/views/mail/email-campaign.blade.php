<x-mail::message>

{!! $body !!}

Thanks,<br>
{{ config('app.name') }}

<img src="{{ route('tracking.openings', $mail) }}" alt="" style="display:none;">
</x-mail::message>
