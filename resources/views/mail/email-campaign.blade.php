<x-mail::message>

{!! $campaign->body !!}

Thanks,<br>
{{ config('app.name') }}

<img src="{{ route('tracking.openings', ['mail' => $mail->id]) }}" alt="" style="display:none;">
</x-mail::message>
